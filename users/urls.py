from django.urls import path
from . import views


urlpatterns = [
    path('register', views.create_user),
    path('login', views.authenticate_user),
    path('update', views.update_user),
    path('', views.get_users),
    path('<int:user_id>', views.get_user),
    path('upload_avatar', views.upload_avatar),
    path('profile', views.my_profile)
]
