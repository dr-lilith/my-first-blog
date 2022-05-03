
# from django.conf.urls import patterns
from django.urls import include, path
from .views import CreateUserAPIView
from . import views

urlpatterns = [
    path('create/', CreateUserAPIView.as_view()),
    path('obtain_token/', views.authenticate_user),

]
