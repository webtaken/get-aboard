from django.apps import AppConfig


class FlowsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "flows"

    def ready(self):
        import flows.signals
