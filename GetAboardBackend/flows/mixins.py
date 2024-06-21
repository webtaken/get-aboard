from functools import cached_property

from django.contrib.auth import get_user_model


class UserMixin:
    @cached_property
    def user(self):
        user = self.request.user
        if isinstance(user, get_user_model()):
            return user
        return get_user_model().objects.get(id=user.id)

    @property
    def user_has_free_plan(self):
        user_subscription = self.request.user.orders.first()
        return user_subscription is None
