from core.serializers import NameSerializer
from django_filters.rest_framework import DjangoFilterBackend
from drf_standardized_errors.openapi import AutoSchema
from flows.mixins import UserMixin
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .filters import TagNameFilter
from .models import FlowTemplate, Tag
from .serializers import FlowTemplateSerializer


class FlowTemplateViewSet(UserMixin, viewsets.ModelViewSet):
    serializer_class = FlowTemplateSerializer
    queryset = FlowTemplate.objects.all()
    permission_classes = [IsAuthenticated]
    schema = AutoSchema()


class TagListAPIView(ListAPIView):
    serializer_class = NameSerializer
    queryset = Tag.objects.all()
    pagination_class = None
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TagNameFilter
    permission_classes = [IsAuthenticated]


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = FlowTemplateSerializer
    permission_classes = [IsAuthenticated]
    schema = AutoSchema()
