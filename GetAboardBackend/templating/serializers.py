from rest_framework.serializers import ModelSerializer

from .models import FlowTemplate, Tag


class FlowTemplateSerializer(ModelSerializer):
    class Meta:
        model = FlowTemplate
        fields = [
            "flow",
            "title",
            "description",
            "created_at",
            "updated_at",
            "tags",
        ]


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]
