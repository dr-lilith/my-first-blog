from django.urls import path
from . import views
from .views import CreateUserAPIView, UserRetrieveUpdateAPIView


urlpatterns = [
    path('register', CreateUserAPIView.as_view()),
    path('login', views.authenticate_user),
    path('update', UserRetrieveUpdateAPIView.as_view()),
    path('<int:id>/upload_avatar', views.upload_avatar)
]
