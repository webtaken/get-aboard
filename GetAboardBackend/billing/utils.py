from django.conf import settings
from django.contrib.auth import get_user_model
from requests import request

from .models import Subscription, SubscriptionPlan


def lemonsqueezy_request(method: str, endpoint: str, **kwargs):
    try:
        response = request(
            method=method,
            url=f"{settings.LEMONSQUEEZY_API_BASE}{endpoint}",
            headers={
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": f"Bearer {settings.LEMONSQUEEZY_API_KEY}",
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
        pass
    elif webhook["meta"]["event_name"].startswith("license_"):
        # Save license keys; eventBody is a "License key"
        pass
