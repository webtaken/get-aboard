from django.db import models


class SubscriptionPlan(models.Model):
    product_id = models.IntegerField(null=False, verbose_name="Product id")
    product_name = models.CharField(max_length=255, verbose_name="Product name")
    variant_id = models.IntegerField(null=False, unique=True, verbose_name="Variant id")
    name = models.CharField(max_length=255, null=False, verbose_name="Name")
    description = models.TextField(verbose_name="Description")
    price = models.CharField(max_length=30, null=False, verbose_name="Price")
    is_usage_based = models.BooleanField(default=False, verbose_name="Is usage based")
    interval = models.CharField(max_length=10, verbose_name="Interval")
    interval_count = models.IntegerField(verbose_name="Interval count")
    trial_interval = models.CharField(
        max_length=10, null=True, verbose_name="Trial interval"
    )
    trial_interval_count = models.IntegerField(
        null=True, verbose_name="Trial interval count"
    )
    sort = models.IntegerField(verbose_name="Sort")

    def __str__(self) -> str:
        return f"{self.product_name} - {self.name} (#{self.variant_id})"
