from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import FlowViewSet, NodeViewSet

router = DefaultRouter()
router.register(r'nodes', NodeViewSet, basename='nodes')
router.register(r'', FlowViewSet, basename='flows')

# urlpatterns = router.urls
