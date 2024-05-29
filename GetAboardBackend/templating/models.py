from core.models import TimeStampedModel
from django.db import models
from flows.models import Flow


class Tag(models.Model):
    class Meta:
        db_table = "tags"
        indexes = [models.Index(fields=["name"], name="tag_name_idx")]

    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class FlowTemplate(TimeStampedModel):
    flow = models.OneToOneField(Flow, on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    tags = models.ManyToManyField(Tag)
    # TODO: In the future would be nice to add company information
    #       from where the user is coming from, like on-boarding
    #       process template at Google, Microsoft, etc.

    def __str__(self):
        return f'Template options for flow "{str(self.flow)}"'
