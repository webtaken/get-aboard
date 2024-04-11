from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import GenericViewSet

from .models import Subscription, SubscriptionPlan
from .serializers import (
    CheckoutURLSerializer,
    GetCheckoutURLRequestSerializer,
    SubscriptionPlanSerializer,
    SubscriptionSerializer,
)
from .utils import lemonsqueezy_request


class SubscriptionPlanListViewSet(ListModelMixin, GenericViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer


class SubscriptionViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=GetCheckoutURLRequestSerializer,
        methods=["POST"],
        responses={HTTP_200_OK: CheckoutURLSerializer},
    )
    @action(methods=["post"], detail=False, url_name="get_checkout_url")
    def get_checkout_url(self, request: Request):
        request_serializer = GetCheckoutURLRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        response = lemonsqueezy_request(
            method="POST",
            endpoint="/checkouts",
            json={
                "data": {
                    "type": "checkouts",
                    "attributes": {
                        "product_options": {
                            "enabled_variants": [],
                            "redirect_url": request_serializer.validated_data[
                                "redirect_url"
                            ],
                            "receipt_button_text": request_serializer.validated_data[
                                "receipt_button_text"
                            ],
                            "receipt_thank_you_note": request_serializer.validated_data[
                                "receipt_thank_you_note"
                            ],
                        },
                        "checkout_options": {
                            "embed": request_serializer.validated_data["embed"],
                            "media": False,
                            "logo": not request_serializer.validated_data["embed"],
                        },
                        "checkout_data": {
                            "email": request_serializer.validated_data["email"],
                            "custom": {
                                "user_id": str(
                                    request_serializer.validated_data["user_id"]
                                )
                            },
                        },
                    },
                    "relationships": {
                        "store": {
                            "data": {
                                "type": "stores",
                                "id": str(settings.LEMONSQUEEZY_STORE_ID),
                            }
                        },
                        "variant": {
                            "data": {
                                "type": "variants",
                                "id": str(
                                    request_serializer.validated_data["variant_id"]
                                ),
                            },
                        },
                    },
                }
            },
        )
        if not response.ok:
            raise APIException("External Error")

        json_data = response.json()
        serializer = CheckoutURLSerializer(
            data={"url": json_data["data"]["attributes"]["url"]}
        )

        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=HTTP_200_OK)
