from django.conf import settings
from django.db import models


class SubscriptionPlan(models.Model):
    class Meta:
        ordering = ["product_id"]

    product_id = models.IntegerField(null=False, verbose_name="Product id")
    product_name = models.CharField(max_length=255, verbose_name="Product name")
    product_description = models.CharField(
        max_length=500, null=True, verbose_name="Product description"
    )
    variant_id = models.IntegerField(null=False, unique=True, verbose_name="Variant id")
    name = models.CharField(max_length=255, null=False, verbose_name="Name")
    description = models.TextField(verbose_name="Variant description")
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


class Subscription(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["plan"]),
            models.Index(fields=["lemonsqueezy_id"]),
        ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL
    )
    plan = models.ForeignKey(SubscriptionPlan, null=True, on_delete=models.SET_NULL)
    lemonsqueezy_id = models.CharField(
        max_length=255, null=False, unique=True, verbose_name="Lemon Squeezy Id"
    )
    order_id = models.IntegerField(null=False, verbose_name="Order Id")
    name = models.CharField(max_length=255, null=False, verbose_name="Name")
    email = models.CharField(max_length=255, null=False, verbose_name="Email")
    status = models.CharField(max_length=50, null=False, verbose_name="Status")
    status_formatted = models.CharField(
        max_length=100, null=False, verbose_name="Status Formatted"
    )
    renews_at = models.CharField(max_length=100, verbose_name="Renews At")
    ends_at = models.CharField(max_length=100, verbose_name="Ends At")
    trial_ends_at = models.CharField(max_length=100, verbose_name="Trial Ends At")
    price = models.CharField(
        max_length=30, blank=True, null=False, verbose_name="Price"
    )
    is_usage_based = models.BooleanField(default=False, verbose_name="Is usage based")
    is_paused = models.BooleanField(default=False, verbose_name="Is paused")
    subscription_item_id = models.BigIntegerField(
        null=True, verbose_name="Subscription Item Id"
    )

    def __str__(self) -> str:
        return f"{self.user}: {self.name}, {self.email} #({self.lemonsqueezy_id})"
