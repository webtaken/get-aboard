from rest_framework.routers import DefaultRouter

from .views import SubscriptionPlanListViewSet

app_name = "subscription_plans"

router = DefaultRouter()
router.register(r"", SubscriptionPlanListViewSet, basename="subscription_plans")

urlpatterns = router.urls
