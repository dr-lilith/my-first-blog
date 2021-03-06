from django.urls import path
from . import views


urlpatterns = [
    path('create', views.post_new),
    path('<int:id>/edit', views.post_edit),
    path('', views.post_list),
    path('<int:id>', views.post_detail),
    path('<int:id>/like', views.like),
    path('<int:id>/dislike', views.dislike),
    path('<int:id>/cancel_reaction', views.cancel_reaction),
    path('<int:id>/delete', views.post_delete)
]

