from rest_framework.routers import DefaultRouter

from .views import FlowSharedViewSet, FlowViewSet, NodeSharedViewSet, NodeViewSet

app_name = "flows"

router = DefaultRouter()
router.register(r"nodes", NodeViewSet, basename="nodes")
router.register(r"nodes-shared", NodeSharedViewSet, basename="nodes-shared")
router.register(r"", FlowViewSet, basename="flows")
router.register(r"flows-shared", FlowSharedViewSet, basename="flows-shared")

urlpatterns = router.urls
