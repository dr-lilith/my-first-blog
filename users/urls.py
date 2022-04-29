
# from django.conf.urls import patterns
from django.urls import include, path
from .views import CreateUserAPIView

urlpatterns = [
    path('create/', CreateUserAPIView.as_view()),
]
