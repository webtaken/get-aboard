from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenVerifyView

from .views import GoogleLogin

urlpatterns = [
    path("register/", RegisterView.as_view(), name="rest_register"),
    path("register/verify-email", VerifyEmailView.as_view(), name="rest_verify_email"),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        TemplateView.as_view(),
        name="account_confirm_email",
    ),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("google/", GoogleLogin.as_view(), name="google_login"),
]
