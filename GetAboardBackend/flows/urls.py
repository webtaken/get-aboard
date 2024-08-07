from rest_framework.routers import DefaultRouter

from .views import FlowViewSet, NodeViewSet

app_name = "flows"

router = DefaultRouter()
router.register(r"nodes", NodeViewSet, basename="nodes")
router.register(r"", FlowViewSet, basename="flows")

urlpatterns = router.urls
