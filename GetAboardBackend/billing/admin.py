from django.contrib import admin

from .models import Subscription, SubscriptionPlan

admin.site.register(SubscriptionPlan)
admin.site.register(Subscription)
