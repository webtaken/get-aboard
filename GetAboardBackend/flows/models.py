from random import randint
from typing import Optional

from django.conf import settings
from django.db import models


class Flow(models.Model):
    class Meta:
        db_table = "flows"

    flow_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="flows"
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    edges_map = models.JSONField(default=list, blank=True)
    nodes_map = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def share(self, option: str, with_pin: bool) -> dict:
        allowed_options = {"view", "comment", "edit"}
        if option not in allowed_options:
            raise ValueError(f"Invalid option, only {allowed_options} are allowed")

        share_options, _ = ShareOption.objects.get_or_create(flow=self)
        url_prefix = f"{settings.CLIENT_HOST}/share/{self.pk}"

        def get_or_create_url(url_field: Optional[str], url_suffix: str) -> str:
            if not url_field:
                url = f"{url_prefix}/{url_suffix}"
                setattr(share_options, f"{url_suffix}_url", url)
                share_options.save()
                return url
            return url_field

        def get_or_create_pin(access_pin_field: Optional[int]) -> int:
            if not access_pin_field:
                pin = "".join([str(randint(0, 9)) for _ in range(5)])
                setattr(share_options, "access_pin", pin)
                share_options.save()
                return pin
            return access_pin_field

        option_to_url_suffix = {
            "view": "view",
            "comment": "comment",
            "edit": "edit",
        }

        url_suffix = option_to_url_suffix[option]
        url_field = getattr(share_options, f"{url_suffix}_url")
        access_pin_field = getattr(share_options, "access_pin")

        return {
            "url": get_or_create_url(url_field, url_suffix),
            "pin": None if not with_pin else get_or_create_pin(access_pin_field),
        }


class ShareOption(models.Model):
    flow = models.OneToOneField(Flow, on_delete=models.CASCADE, primary_key=True)
    view_url = models.URLField(null=True, blank=True)
    comment_url = models.URLField(null=True, blank=True)
    edit_url = models.URLField(null=True, blank=True)
    access_pin = models.CharField(null=True, max_length=5)

    def __str__(self):
        return f'Share options for flow "{str(self.flow)}"'


class Node(models.Model):
    class Meta:
        db_table = "nodes"

    node_id = models.BigAutoField(primary_key=True)
    flow = models.ForeignKey(Flow, on_delete=models.CASCADE, related_name="nodes")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
