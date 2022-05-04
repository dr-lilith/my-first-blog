
# from django.conf.urls import patterns
from django.urls import include, path
from .views import CreateUserAPIView
from . import views
from .views import CreateUserAPIView, UserRetrieveUpdateAPIView


urlpatterns = [
    path('create', CreateUserAPIView.as_view()),
    path('obtain_token', views.authenticate_user),
    path('update', UserRetrieveUpdateAPIView.as_view()),

]
