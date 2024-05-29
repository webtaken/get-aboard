from django.contrib import admin
from templating.models import FlowTemplate

from .models import Flow, Node, ShareOption


class ShareOptionInline(admin.StackedInline):
    model = ShareOption
    extra = 1


class TemplateConfigurationInline(admin.StackedInline):
    model = FlowTemplate
    extra = 1


class FlowAdmin(admin.ModelAdmin):
    inlines = (
        ShareOptionInline,
        TemplateConfigurationInline,
    )


admin.site.register(Flow, FlowAdmin)
admin.site.register(Node)
