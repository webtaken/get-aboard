from rest_framework.serializers import ModelSerializer, Serializer, URLField

from .models import SubscriptionPlan


class SubscriptionPlanSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = "__all__"


class CheckoutURLSerializer(Serializer):
    url = URLField()
