from django.conf import settings
from django.core.management.base import BaseCommand

from billing.models import OneTimePaymentProduct
from billing.utils import get_product, lemonsqueezy_request


class Command(BaseCommand):
    help = "Sync single payment products with lemonsqueezy"

    def add_arguments(self, parser):
        pass

    def get_price_by_variant_id(self, variant_id):
        price = lemonsqueezy_request(
            method="GET", endpoint="/prices", params={"filter[variant_id]": variant_id}
        ).json()
        return price

    def handle(self, *args, **options):
        products = lemonsqueezy_request(
            method="GET",
            endpoint="/products",
            params={
                "filter[store_id]": settings.LEMONSQUEEZY_STORE_ID,
                "include": "variants",
            },
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

            product = get_product(attrs["product_id"])
            product_name = product["data"]["attributes"]["name"]
            product_description = product["data"]["attributes"]["description"]

            variant_price_obj = self.get_price_by_variant_id(variant["id"])
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
            price_string = str(price) if price is not None else "0"

            is_one_time_payment = (
                current_price_obj["attributes"]["category"] == "one_time"
            )

            if not is_one_time_payment:
                continue

            one_time_payment_product, created = (
                OneTimePaymentProduct.objects.update_or_create(
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
                        "product_description": product_description,
                        "variant_id": int(variant["id"]),
                        "trial_interval": trial_interval,
                        "trial_interval_count": trial_interval_count,
                        "sort": attrs["sort"],
                    },
                )
            )

            print(
                f"One time payment product {one_time_payment_product} created"
                if created
                else f"One time payment product {one_time_payment_product} updated"
            )
