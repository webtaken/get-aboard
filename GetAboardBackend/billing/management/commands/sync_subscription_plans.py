import requests
from django.conf import settings
from django.core.management.base import BaseCommand

from billing.models import SubscriptionPlan


class Command(BaseCommand):
    help = "Sync subscription plans with lemonsqueezy"
    HEADERS = {"Authorization": f"Bearer {settings.LEMONSQUEEZY_API_KEY}"}

    def add_arguments(self, parser):
        pass

    def get_price(self, variant_id):
        price = requests.get(
            f"{settings.LEMONSQUEEZY_API_BASE}/prices",
            params={"filter[variant_id]": variant_id},
            headers=self.HEADERS,
        ).json()
        return price

    def get_product(self, product_id: int):
        product = requests.get(
            f"{settings.LEMONSQUEEZY_API_BASE}/products/{product_id}",
            headers=self.HEADERS,
        ).json()
        return product

    def handle(self, *args, **options):
        products = requests.get(
            f"{settings.LEMONSQUEEZY_API_BASE}/products",
            params={
                "filter[store_id]": settings.LEMONSQUEEZY_STORE_ID,
                "include": "variants",
            },
            headers=self.HEADERS,
        ).json()

        all_variants = products["included"]

        for variant in all_variants:
            attrs = variant["attributes"]

            # Skip draft variants or if there's more than one variant, skip the default
            # variant. See https://docs.lemonsqueezy.com/api/variants
            if attrs["status"] == "draft" or (
                len(all_variants) != 1 and attrs["status"] == "pending"
            ):
                continue

            product_name = self.get_product(attrs["product_id"])["data"]["attributes"][
                "name"
            ]

            variant_price_obj = self.get_price(variant["id"])
            current_price_obj = variant_price_obj["data"][0]
            # print(json.dumps(variant_price_obj, indent=2, default=str))
            # print(json.dumps(current_price_obj, indent=2, default=str))
            is_usage_based = (
                current_price_obj["attributes"]["usage_aggregation"] is not None
            )
            interval = current_price_obj["attributes"]["renewal_interval_unit"]
            interval_count = current_price_obj["attributes"][
                "renewal_interval_quantity"
            ]
            trial_interval = current_price_obj["attributes"]["trial_interval_unit"]
            trial_interval_count = current_price_obj["attributes"][
                "trial_interval_quantity"
            ]
            price = (
                current_price_obj["attributes"]["unit_price_decimal"]
                if is_usage_based
                else current_price_obj["attributes"]["unit_price"]
            )
            price_string = str(price or "") if price is not None else ""

            is_subscription = (
                current_price_obj["attributes"]["category"] == "subscription"
            )

            if not is_subscription:
                continue

            subscription_plan, created = SubscriptionPlan.objects.update_or_create(
                variant_id=int(variant["id"]),
                defaults={
                    "name": attrs["name"],
                    "description": attrs["description"],
                    "price": price_string,
                    "interval": interval,
                    "interval_count": interval_count,
                    "is_usage_based": is_usage_based,
                    "product_id": attrs["product_id"],
                    "product_name": product_name,
                    "variant_id": int(variant["id"]),
                    "trial_interval": trial_interval,
                    "trial_interval_count": trial_interval_count,
                    "sort": attrs["sort"],
                },
            )

            print(
                f"Subscription plan {subscription_plan} created"
                if created
                else f"Subscription plan {subscription_plan} updated"
            )
