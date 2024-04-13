import hashlib
import hmac

from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import action
from rest_framework.exceptions import APIException, NotFound
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from .models import Subscription, SubscriptionPlan
from .serializers import (
    CheckoutURLSerializer,
    CustomerPortalURLSerializer,
    GetCheckoutURLRequestSerializer,
    SubscriptionPlanSerializer,
    SubscriptionSerializer,
)
from .utils import get_subscription, lemonsqueezy_request, process_webhook


class SubscriptionPlanListViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer


class SubscriptionViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=None,
        description="Retrieves the customer portal url of a subscription",
        methods=["GET"],
        responses={HTTP_200_OK: CustomerPortalURLSerializer},
    )
    @action(methods=["get"], detail=True, url_name="get_customer_portal")
    def get_customer_portal(self, request, pk=None, **kwargs):
        subscription = get_subscription(pk)

        serializer = CustomerPortalURLSerializer(
            data={"url": subscription["data"]["attributes"]["urls"]["customer_portal"]}
        )
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=HTTP_200_OK)

    @extend_schema(
        request=None,
        description="Retrieves the current subscription of the given user_id",
        parameters=[
            OpenApiParameter(
                name="user_id",
                description="The user id requesting his subscriptions",
                required=True,
                type=OpenApiTypes.INT,
            ),
        ],
        methods=["GET"],
        responses={HTTP_200_OK: SubscriptionSerializer},
    )
    @action(methods=["get"], detail=False, url_name="get_user_subscription")
    def get_user_subscription(self, request, **kwargs):
        user = get_object_or_404(
            get_user_model(), pk=request.query_params.get("user_id")
        )
        subscription = Subscription.objects.filter(user=user).first()
        if subscription is None:
            raise NotFound("No subscriptions found for this user")
        serializer = SubscriptionSerializer(subscription)
        return Response(serializer.data)

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


class LemonSqueezyWebhook(APIView):
    """
    Handle events happening on lemonsqueezy (subscription created and updated).
    """

    def post(self, request: Request, format=None):
        signature = request.META["HTTP_X_SIGNATURE"]
        secret = settings.LEMONSQUEEZY_WEBHOOK_SECRET

        digest = hmac.new(secret.encode(), request.body, hashlib.sha256).hexdigest()

        if not hmac.compare_digest(digest, signature):
            raise Exception("Invalid signature.")

        webhook = request.data
        if webhook["meta"]:
            try:
                process_webhook(webhook)
            except Exception as e:
                print("Error while processing webhook: ", e)
                return Response(
                    data={
                        "status": HTTP_500_INTERNAL_SERVER_ERROR,
                        "description": str(e),
                    },
                    status=HTTP_500_INTERNAL_SERVER_ERROR,
                )
            return Response(data={"status": HTTP_200_OK}, status=HTTP_200_OK)

        return Response(
            data={
                "status": HTTP_500_INTERNAL_SERVER_ERROR,
                "description": "webhook doesn't have the 'meta' key",
            },
            status=HTTP_500_INTERNAL_SERVER_ERROR,
        )
