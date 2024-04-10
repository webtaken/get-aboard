from django.conf import settings
from requests import request


def lemonsqueezy_request(method: str, endpoint: str, **kwargs):
    try:
        response = request(
            method=method,
            url=f"{settings.LEMONSQUEEZY_API_BASE}{endpoint}",
            headers={
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": f"Bearer {settings.LEMONSQUEEZY_API_KEY}",
            },
            **kwargs,
        )
        if not response.ok:
            print(
                f"Received not OK response from the lemonsqueezy API:\nStatus: {response.status_code}\nText: {response.text}"
            )
    except Exception as e:
        print(f"Error while doing Lemonsqueezy request {e}")
        return None
    return response


def get_list_products():
    response = lemonsqueezy_request(
        method="GET",
        endpoint="/products",
        params={
            "filter[store_id]": settings.LEMONSQUEEZY_STORE_ID,
            "include": "variants",
        },
    )
    print(response.json())
