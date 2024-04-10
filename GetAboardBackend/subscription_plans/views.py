from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from .models import SubscriptionPlan
from .serializers import SubscriptionPlanSerializer


class SubscriptionPlanListViewSet(ListModelMixin, GenericViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer


class SubscriptionActionsViewSet(GenericViewSet):
    pass
