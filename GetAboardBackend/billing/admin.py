from django.contrib import admin

from .models import OneTimePaymentProduct, Order, Subscription, SubscriptionPlan

admin.site.register(SubscriptionPlan)
admin.site.register(Subscription)
admin.site.register(OneTimePaymentProduct)
admin.site.register(Order)
