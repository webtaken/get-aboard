from billing.constants import (
    FLOWS_LIMIT_REACHED,
    MAX_FLOWS_FREE_PLAN,
    MAX_NODES_FREE_PLAN,
    NODES_LIMIT_REACHED,
)
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from drf_standardized_errors.openapi import AutoSchema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .mixins import UserMixin
from .models import Flow, Node, ShareOption
from .serializers import FlowSerializer, FlowShareURLSerializer, NodeSerializer


class FlowViewSet(UserMixin, viewsets.ModelViewSet):
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated]
    schema = AutoSchema()

    def get_queryset(self):
        return self.user.flows.all().order_by("-updated_at")

    def list(self, request: Request, *args, **kwargs):
        flows = self.get_queryset().defer("edges_map", "nodes_map")
        to_drop = ("edges_map", "nodes_map")
        serializer = FlowSerializer(
            flows,
            drop=to_drop,
            many=True,
        )
        return Response(serializer.data)

    def create(self, request: Request, *args, **kwargs):
        user_subscription = self.user.subscriptions.first()
        if user_subscription is None:
            # User has free account
            # Check if limit has been reached
            if self.get_queryset().count() >= MAX_FLOWS_FREE_PLAN:
                raise ValidationError("Max flows limit reached", FLOWS_LIMIT_REACHED)
        return super().create(request, *args, **kwargs)

    def partial_update(self, request: Request, *args, **kwargs):
        user_subscription = self.user.subscriptions.first()
        # We have to check as well if we are updating the nodes_map
        if user_subscription is None and "nodes_map" in request.data:
            # User has free account
            # Check if limit of nodes map has been reached
            nodes_map = request.data["nodes_map"]
            # Check if nodes map has reached the limit
            if len(nodes_map) > MAX_NODES_FREE_PLAN:
                raise ValidationError(
                    "Max nodes limit reached, changes won't take effect",
                    NODES_LIMIT_REACHED,
                )
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        request=None,
        parameters=[
            OpenApiParameter(
                name="option",
                description='Sends the option to share only allowed: "view", "comment" or "edit"',
                required=True,
                type=OpenApiTypes.STR,
            ),
            OpenApiParameter(
                name="with_pin",
                description="Specify if url will need an access pin",
                required=True,
                type=OpenApiTypes.BOOL,
            ),
        ],
        methods=["PATCH"],
        responses={HTTP_200_OK: FlowShareURLSerializer},
    )
    @action(detail=True, methods=["patch"], url_name="share_flow")
    def share_flow(self, request: Request, pk=None, **kwargs):
        # By default share is only for view
        option = request.query_params.get("option", "view")
        with_pin = request.query_params.get("with_pin", False)
        if isinstance(with_pin, str):
            with_pin = (
                True if with_pin == "true" else False if with_pin == "false" else False
            )
        flow: Flow = self.get_object()

        try:
            share_option = flow.share(option, with_pin)
        except ValueError as e:
            raise ValidationError(str(e))

        url_serializer = FlowShareURLSerializer(data=share_option)
        if url_serializer.is_valid():
            return Response(url_serializer.data)
        raise ValidationError(str(url_serializer.errors))

    @extend_schema(
        request=None,
        parameters=[
            OpenApiParameter(
                name="field",
                description="Deletes the associated ShareOption model to the Flow depending on fields\n"
                "if field equals 'url' we delete all the flow, if field equals 'pin' we delete only pin field\n"
                "on the ShareOption model",
                required=True,
                type=OpenApiTypes.STR,
            ),
        ],
        methods=["PATCH"],
        responses={HTTP_200_OK: {}},
    )
    @action(detail=True, methods=["patch"], url_name="unshare_flow")
    def unshare_flow(self, request: Request, pk=None, **kwargs):
        # By default share is only for view
        field = request.query_params.get("field", None)

        if field not in {"url", "pin"}:
            raise ValidationError(detail='"field" query param must be "url" or "pin"')

        share_option = ShareOption.objects.filter(pk=pk).first()
        if share_option is None:
            raise NotFound("")

        if share_option and field == "url":
            share_option.delete()
        if share_option and field == "pin":
            share_option.access_pin = None
            share_option.save()

        return Response({}, status=HTTP_200_OK)

    @extend_schema(
        methods=["GET"],
        responses={HTTP_200_OK: FlowShareURLSerializer},
    )
    @action(detail=True, methods=["get"], url_name="get_share_options")
    def get_share_options(self, request: Request, pk=None, **kwargs):
        flow: Flow = self.get_object()
        share_option = ShareOption.objects.filter(flow=flow).first()
        if not share_option:
            raise NotFound("Flow doesn't have share options")

        serializer = FlowShareURLSerializer(
            data={"url": share_option.view_url, "pin": share_option.access_pin}
        )
        if serializer.is_valid():
            return Response(serializer.data)
        raise ValidationError(str(serializer.errors))

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="option",
                description='Sends the option to share only allowed: "view", "comment" or "edit"',
                required=True,
                type=OpenApiTypes.STR,
            ),
            OpenApiParameter(
                name="pin",
                description="The access pin in case share options will need it",
                required=False,
                type=OpenApiTypes.STR,
            ),
        ],
        methods=["GET"],
        responses={HTTP_200_OK: FlowSerializer},
    )
    @action(detail=True, methods=["get"], url_name="get_shared_flow")
    def get_shared_flow(self, request: Request, pk=None, **kwargs):
        # By default share is only for view
        option = request.query_params.get("option", "view")
        pin = request.query_params.get("pin")

        if option not in {"view", "comment", "edit"}:
            raise ValidationError("Unsupported share option.")

        flow: Flow = self.get_object()
        share_option = ShareOption.objects.filter(flow=flow).first()
        if not share_option:
            raise NotFound("Flow doesn't have share options")

        url = getattr(share_option, f"{option}_url")
        if not url:
            raise NotFound("Flow doesn't have specified share option")

        access_pin = share_option.access_pin
        if access_pin and access_pin != pin:
            raise ValidationError("Invalid access pin")

        serializer = FlowSerializer(flow)
        return Response(serializer.data)


class NodeViewSet(UserMixin, viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = [IsAuthenticated]
    schema = AutoSchema()

    def create(self, request: Request, *args, **kwargs):
        user_subscription = self.user.subscriptions.first()
        if user_subscription is None:
            # User has free plan
            flow_id = request.data["flow"]
            flow = Flow.objects.get(pk=flow_id)
            # Check if related flow reached the limit
            if flow.nodes.count() >= MAX_NODES_FREE_PLAN:
                raise ValidationError("Max nodes limit reached", NODES_LIMIT_REACHED)
        return super().create(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="flow_id",
                description="get all the nodes related to this flow",
                required=False,
                type=int,
            ),
            OpenApiParameter(
                name="description",
                description="includes the description of the nodes",
                required=False,
                type=bool,
            ),
        ]
    )
    def list(self, request: Request, *args, **kwargs):
        flow_id = request.query_params.get("flow_id", None)
        description = request.query_params.get("description", None)
        description = (
            True if description == "true" and description is not None else False
        )
        nodes = Node.objects.all()
        if flow_id:
            nodes = nodes.filter(flow_id=flow_id)
        to_drop = None
        if not description:
            nodes = nodes.defer("description")
            to_drop = ("description",)
        serializer = NodeSerializer(
            nodes,
            drop=to_drop,
            many=True,
        )
        return Response(serializer.data)
