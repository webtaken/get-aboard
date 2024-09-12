from django.contrib.auth import get_user_model
from requests import request

from GetAboardBackend.settings import env

from .models import OneTimePaymentProduct, Order, Subscription, SubscriptionPlan


def lemonsqueezy_request(method: str, endpoint: str, **kwargs):
    try:
        response = request(
            method=method,
            url=f"{env('LEMONSQUEEZY_API_BASE')}{endpoint}",
            headers={
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": f"Bearer {env('LEMONSQUEEZY_API_KEY')}",
            },
            **kwargs,
        )
        if not response.ok:
            print(
                f"Received not OK response from the lemonsqueezy API:\nStatus: {response.status_code}\nText: {response.text}"
            )
    except Exception as e:
        print(f"Error while doing Lemonsqueezy request {e}")
        return None
    return response


def get_price(price_id):
    price = lemonsqueezy_request(method="GET", endpoint=f"/prices/{price_id}").json()
    return price


def get_product(product_id: int):
    product = lemonsqueezy_request(
        method="GET", endpoint=f"/products/{product_id}"
    ).json()
    return product


def get_subscription(subscription_id):
    subscription = lemonsqueezy_request(
        method="GET", endpoint=f"/subscriptions/{subscription_id}"
    ).json()
    return subscription


def get_order(order_id):
    order = lemonsqueezy_request(method="GET", endpoint=f"/orders/{order_id}").json()
    return order


def process_webhook(webhook: dict):
    if webhook["data"]:
        if webhook["meta"]["event_name"].startswith("subscription_payment_"):
            # Save subscription invoices; eventBody is a SubscriptionInvoice
            pass
        elif webhook["meta"]["event_name"].startswith("subscription_"):
            # Save subscription events; obj is a Subscription
            attributes = webhook["data"]["attributes"]
            variant_id = str(attributes["variant_id"])
            # We assume that the plan table is up to date
            susbcription_plan = SubscriptionPlan.objects.filter(
                variant_id=variant_id
            ).first()

            if susbcription_plan is None:
                raise Exception(
                    f"no subscription plan with with the variant id {variant_id}"
                )

            # Update the subscription in the database
            price_id = attributes["first_subscription_item"]["price_id"]

            # Get the price data from Lemon Squeezy
            price_data = get_price(price_id)
            if "errors" in price_data:
                raise Exception(
                    f"Failed to get the price data for the subscription {webhook['data']['id']}."
                )

            is_usage_based = attributes["first_subscription_item"]["is_usage_based"]
            price = (
                price_data["data"]["attributes"]["unit_price_decimal"]
                if is_usage_based
                else price_data["data"]["attributes"]["unit_price"]
            )

            subscription, created = Subscription.objects.update_or_create(
                lemonsqueezy_id=str(webhook["data"]["id"]),
                defaults={
                    "lemonsqueezy_id": str(webhook["data"]["id"]),
                    "order_id": int(attributes["order_id"]),
                    "name": str(attributes["user_name"]),
                    "email": str(attributes["user_email"]),
                    "status": str(attributes["status"]),
                    "status_formatted": str(attributes["status_formatted"]),
                    "renews_at": str(attributes["renews_at"]),
                    "ends_at": str(attributes["ends_at"]),
                    "trial_ends_at": str(attributes["trial_ends_at"]),
                    "price": str(price) if price else "",
                    "is_paused": False,
                    "subscription_item_id": attributes["first_subscription_item"]["id"],
                    "is_usage_based": attributes["first_subscription_item"][
                        "is_usage_based"
                    ],
                    "user": get_user_model()
                    .objects.filter(pk=webhook["meta"]["custom_data"]["user_id"])
                    .first(),
                    "plan": susbcription_plan,
                },
            )

            print(
                f"Subscription {subscription} created"
                if created
                else f"Subscription plan {subscription} updated"
            )

        elif webhook["meta"]["event_name"].startswith("order_"):
            # Save orders; eventBody is a "Order"
            attributes = webhook["data"]["attributes"]
            variant_id = str(attributes["first_order_item"]["variant_id"])
            # We assume that the plan table is up to date
            one_time_payment_product = OneTimePaymentProduct.objects.filter(
                variant_id=variant_id
            ).first()

            if one_time_payment_product is None:
                raise Exception(
                    f"no single payment product found with with the variant id {variant_id}"
                )

            price = attributes["first_order_item"]["price"]

            order, created = Order.objects.update_or_create(
                lemonsqueezy_id=str(webhook["data"]["id"]),
                defaults={
                    "lemonsqueezy_id": str(webhook["data"]["id"]),
                    "order_number": int(attributes["order_number"]),
                    "order_id": int(attributes["first_order_item"]["order_id"]),
                    "name": str(attributes["user_name"]),
                    "email": str(attributes["user_email"]),
                    "status": str(attributes["status"]),
                    "status_formatted": str(attributes["status_formatted"]),
                    "refunded": str(attributes["refunded"]),
                    "refunded_at": str(attributes["refunded_at"]),
                    "price": str(price) if price else "",
                    "receipt": str(attributes["urls"]["receipt"]),
                    "order_item_id": attributes["first_order_item"]["id"],
                    "user": get_user_model()
                    .objects.filter(pk=webhook["meta"]["custom_data"]["user_id"])
                    .first(),
                    "one_time_payment_product": one_time_payment_product,
                },
            )

            print(f"Order {order} created" if created else f"Order {order} updated")

        elif webhook["meta"]["event_name"].startswith("license_"):
            # Save license keys; eventBody is a "License key"
            pass
