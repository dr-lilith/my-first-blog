from django.urls import path
from . import views


urlpatterns = [
    path('register', views.create_user),
    path('login', views.authenticate_user),
    path('update', views.update_user),
    path('', views.get_users),
    path('<int:id>/upload_avatar', views.upload_avatar)
]
