from datetime import timedelta
from functools import cached_property

from django.contrib.auth import get_user_model
from django.utils import timezone


class UserMixin:
    @cached_property
    def user(self):
        user = self.request.user
        if isinstance(user, get_user_model()):
            return user
        return get_user_model().objects.get(id=user.id)

    @property
    def user_has_free_trial(self):
        trial_end_date = self.user.date_joined + timedelta(days=15)
        return timezone.now() <= trial_end_date

    @property
    def user_has_order(self):
        user_subscription = self.user.orders.first()
        return user_subscription is not None
