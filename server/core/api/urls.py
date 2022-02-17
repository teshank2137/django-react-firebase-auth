from django.urls import path

from .views import AuthenticatedView, RegisterUser

urlpatterns = [
    path('verified', AuthenticatedView.as_view()),
    path('register', RegisterUser.as_view()),
]
