from rest_framework.serializers import CharField, IntegerField, Serializer


class NameSerializer(Serializer):
    id = IntegerField()
    name = CharField()
