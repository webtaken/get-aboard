from rest_framework.serializers import (
    BooleanField,
    CharField,
    EmailField,
    IntegerField,
    ModelSerializer,
    Serializer,
    URLField,
    ValidationError,
)

from .models import OneTimePaymentProduct, Order, Subscription, SubscriptionPlan


class SubscriptionPlanSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = "__all__"


class OneTimePaymentProductSerializer(ModelSerializer):
    class Meta:
        model = OneTimePaymentProduct
        fields = "__all__"


class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class CheckoutURLSerializer(Serializer):
    url = URLField()


class CustomerPortalURLSerializer(CheckoutURLSerializer):
    pass


class GetCheckoutURLRequestSerializer(Serializer):
    receipt_button_text = CharField(max_length=100, default="Go to Dashboard")
    receipt_thank_you_note = CharField(
        max_length=500, default="Thank you for sign up to the plan!"
    )
    redirect_url = URLField(required=True, allow_null=False)
    embed = BooleanField(default=False)
    email = EmailField(required=True, allow_null=False)
    user_id = IntegerField(required=True, allow_null=False)
    variant_id = IntegerField(required=True, allow_null=False)

    def validate_user_id(self, value: int):
        if value <= 0:
            raise ValidationError("user_id must be positive")
        return value

    def validate_variant_id(self, value: int):
        if value <= 0:
            raise ValidationError("variant_id must be positive")
        return value
