from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    LemonSqueezyWebhook,
    OneTimePaymentProductListViewSet,
    SubscriptionPlanListViewSet,
    SubscriptionViewSet,
)

app_name = "billing"

router = DefaultRouter()
router.register(r"plans", SubscriptionPlanListViewSet, basename="subscription_plans")
router.register(
    r"one-time-payment-products",
    OneTimePaymentProductListViewSet,
    basename="one_time_payment_products",
)
router.register(r"subscription", SubscriptionViewSet, basename="subscriptions")

urlpatterns = router.urls + [
    path("webhook", LemonSqueezyWebhook.as_view(), name="webhook")
]
