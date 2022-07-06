from django.urls import path
from . import views


urlpatterns = [
    path('create', views.post_new),
    path('<int:id>/edit', views.post_edit),
    path('pages/<int:page_num>/size/<int:page_size>', views.paging_posts),
    path('postlist', views.post_list),
    path('my-posts', views.my_posts),
    path('<int:id>', views.post_detail),
    path('<int:id>/mylike', views.mylike),
    path('<int:id>/like', views.like),
    path('<int:id>/dislike', views.dislike),
    path('<int:id>/cancel_reaction', views.cancel_reaction),
    path('<int:id>/delete', views.post_delete),
    path('<int:id>/add_tag', views.add_tag),
    path('<int:id>/search_tag', views.search_tag),
    path('<int:id>/delete_tag', views.delete_tag),
    path('search_by_tag', views.search_by_tag),
    path('<int:id>/upload_post_photo', views.upload_post_photo),
    path('<int:id>/upload_post_photo_from_url', views.upload_post_photo_from_url),
]

