from django.urls import path
from . import views


urlpatterns = [
    path('create', views.comment_new),
    path('<int:id>/edit', views.comment_edit),
    path('', views.comment_list),
    path('<int:id>', views.comment_detail),
    path('<int:id>/delete', views.comment_delete)
]

