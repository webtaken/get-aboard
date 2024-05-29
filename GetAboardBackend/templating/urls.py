from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import FlowTemplateViewSet, TagListAPIView, TagViewSet

app_name = "templating"

router = DefaultRouter()
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"", FlowTemplateViewSet, basename="templates")

urlpatterns = [
    path("", include(router.urls)),
    re_path(
        r"tags/name/list",
        TagListAPIView.as_view(),
        name="tag_name_list",
    ),
]
