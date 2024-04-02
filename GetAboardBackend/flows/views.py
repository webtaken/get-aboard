from .models import Node, Flow, ShareOption
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework.request import Request
from .serializers import FlowSerializer, NodeSerializer, FlowShareURLSerializer
from .mixins import UserMixin


class FlowViewSet(UserMixin, viewsets.ModelViewSet):
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated]
    MAX_FLOWS = 1

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
        print(self.get_queryset().count())
        if self.get_queryset().count() >= self.MAX_FLOWS:
            raise ValidationError("Max flows limit reached")
        return super().create(request, *args, **kwargs)

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
    def share_flow(self, request: Request, pk=None):
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
            return Response(data={"msg": str(e)}, status=HTTP_400_BAD_REQUEST)

        url_serializer = FlowShareURLSerializer(data=share_option)
        if url_serializer.is_valid():
            return Response(url_serializer.data)
        return Response(url_serializer.errors, status=HTTP_400_BAD_REQUEST)

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
    def unshare_flow(self, request: Request, pk=None):
        # By default share is only for view
        field = request.query_params.get("field", None)

        if field not in {"url", "pin"}:
            raise ValidationError(detail='"field" query param must be "url" or "pin"')

        share_option = ShareOption.objects.filter(pk=pk).first()
        if share_option is None:
            return Response({}, status=HTTP_404_NOT_FOUND)

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
    def get_share_options(self, request: Request, pk=None):
        flow: Flow = self.get_object()
        share_option = ShareOption.objects.filter(flow=flow).first()
        if not share_option:
            return Response(
                data={"error": "Flow doesn't have share options"},
                status=HTTP_404_NOT_FOUND,
            )

        serializer = FlowShareURLSerializer(
            data={"url": share_option.view_url, "pin": share_option.access_pin}
        )
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

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
    def get_shared_flow(self, request: Request, pk=None):
        # By default share is only for view
        option = request.query_params.get("option", "view")
        pin = request.query_params.get("pin")

        if option not in {"view", "comment", "edit"}:
            return Response(
                data={"error": "Unsupported share option."}, status=HTTP_400_BAD_REQUEST
            )

        flow: Flow = self.get_object()
        share_option = ShareOption.objects.filter(flow=flow).first()
        if not share_option:
            return Response(
                data={"error": "Flow doesn't have share options"},
                status=HTTP_404_NOT_FOUND,
            )

        url = getattr(share_option, f"{option}_url")
        if not url:
            return Response(
                data={"error": "Flow doesn't have specified share option"},
                status=HTTP_404_NOT_FOUND,
            )

        access_pin = share_option.access_pin
        if access_pin and access_pin != pin:
            return Response(
                data={"error": "Invalid access pin"},
                status=HTTP_400_BAD_REQUEST,
            )

        serializer = FlowSerializer(flow)
        return Response(serializer.data)


class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = [IsAuthenticated]

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
