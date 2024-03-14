from .models import Node, Flow
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework.request import Request
from .serializers import FlowSerializer, NodeSerializer, FlowShareURLSerializer
from .mixins import UserMixin


class FlowViewSet(UserMixin, viewsets.ModelViewSet):
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated]

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

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="option",
                description='Sends the option to share only allowed: "view", "comment" or "edit"',
                required=True,
                type=OpenApiTypes.STR,
            ),
        ],
        methods=["PATCH"],
        responses={HTTP_200_OK: FlowShareURLSerializer},
    )
    @action(detail=True, methods=["patch"], url_name="share_flow")
    def share_flow(self, request: Request, pk=None):
        # By default share is only for view
        option = request.query_params.get("option", "view")
        flow: Flow = self.get_object()

        try:
            share_url = flow.share(option)
        except ValueError as e:
            return Response(data={"msg": str(e)}, status=HTTP_400_BAD_REQUEST)

        url_serializer = FlowShareURLSerializer(data={"url": share_url})
        if url_serializer.is_valid():
            return Response(url_serializer.data)
        return Response(url_serializer.errors, status=HTTP_400_BAD_REQUEST)


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
