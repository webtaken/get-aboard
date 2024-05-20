from django_filters.rest_framework import CharFilter, FilterSet

from .models import Tag


class TagNameFilter(FilterSet):
    name = CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Tag
        fields = ("name",)
