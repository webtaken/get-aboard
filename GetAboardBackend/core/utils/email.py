import requests
from django.conf import settings
from requests.auth import HTTPBasicAuth


def send_email(recipients: list[str] | str, subject: str, html: str):
    payload = {
        "from": settings.EMAIL_HOST_USER,
        "to": ",".join(recipients) if isinstance(recipients, list) else recipients,
        "subject": subject,
        "html": html,
    }
    res = requests.post(
        f"{settings.FORWARD_EMAIL_API_BASE}/v1/emails",
        auth=HTTPBasicAuth(settings.FORWARD_EMAIL_API_KEY, ""),
        data=payload,
    )
    return res, res.ok
