from django.contrib import admin
from .models import Flow, ShareOption, Node


class ShareOptionInline(admin.StackedInline):
    model = ShareOption
    extra = 1


class FlowAdmin(admin.ModelAdmin):
    inlines = [ShareOptionInline]


admin.site.register(Flow, FlowAdmin)
admin.site.register(Node)
