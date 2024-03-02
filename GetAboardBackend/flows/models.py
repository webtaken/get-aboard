from django.db import models
from django.conf import settings


class Flow(models.Model):
    flow_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="flows"
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    edges_map = models.JSONField(default=list)
    nodes_map = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "flows"


class Node(models.Model):
    node_id = models.BigAutoField(primary_key=True)
    flow = models.ForeignKey(Flow, on_delete=models.CASCADE, related_name="nodes")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "nodes"
