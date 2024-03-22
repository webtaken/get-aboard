from functools import cached_property

from django.contrib.auth import get_user_model


class UserMixin:
    @cached_property
    def user(self):
        user = self.request.user
        if isinstance(user, get_user_model()):
            return user
        else:
            return get_user_model().objects.get(id=user.id)