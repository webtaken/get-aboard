from rest_framework.routers import DefaultRouter

from .views import SubscriptionPlanListViewSet, SubscriptionViewSet

app_name = "billing"

router = DefaultRouter()
router.register(r"plans", SubscriptionPlanListViewSet, basename="subscription_plans")
router.register(r"subscription", SubscriptionViewSet, basename="subscriptions")

urlpatterns = router.urls
