from .models import Flow, Node
from rest_framework import serializers


class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = [
            'flow_id',
            'user',
            'title',
            'description',
            'created_at',
            'updated_at',
            'edges',
        ]

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        drop = kwargs.pop('drop', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if drop is not None:
            to_drop = set(drop)
            for field_name in to_drop:
                self.fields.pop(field_name)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = [
            'node_id',
            'flow',
            'title',
            'x_pos',
            'y_pos',
            'description',
            'created_at',
            'updated_at',
        ]

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        drop = kwargs.pop('drop', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if drop is not None:
            to_drop = set(drop)
            for field_name in to_drop:
                self.fields.pop(field_name)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
