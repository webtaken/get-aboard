import io
from .models import Flow, Node
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.request import Request
from .serializers import FlowSerializer, NodeSerializer


class FlowViewSet(viewsets.ModelViewSet):
    queryset = Flow.objects.all().order_by('-updated_at')
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request: Request, pk=None):
        get_nodes = request.query_params.pop('get_nodes', None)
        if get_nodes:
            flow = Flow.objects.get(pk=pk)
            nodes = Flow.node_set.all()
            print(nodes)
            serializer = NodeSerializer(nodes, many=True)
            return Response(serializer.data)
        flow = Flow.objects.get(pk=pk)
        serializer = FlowSerializer(flow)
        return Response(serializer.data)


class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = [IsAuthenticated]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='flow_id',
                description='get all the nodes related to this flow',
                required=False,
                type=int,
            ),
            OpenApiParameter(
                name='description',
                description='includes the description of the nodes',
                required=False,
                type=bool,
            )
        ]
    )
    def list(self, request: Request, *args, **kwargs):
        flow_id = request.query_params.get('flow_id', None)
        description = request.query_params.get('description', None)
        description = True if description == 'true' and description is not None else False
        nodes = Node.objects.all()
        if flow_id:
            nodes = nodes.filter(flow_id=flow_id)
        to_drop = None
        print(description)
        if not description:
            nodes = nodes.defer('description')
            to_drop = ('description',)
        serializer = NodeSerializer(
            nodes,
            drop=to_drop,
            many=True,
        )
        return Response(serializer.data)
