import rest_framework.permissions as p
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Post
from .forms import PostForm
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


@api_view(['GET'])
def post_list(request):
    # posts = Post.objects.all(is_deleted=False).values()
    posts = Post.objects.filter(is_deleted=False).values()
    return Response(posts, status=status.HTTP_200_OK)


@api_view(['GET'])
def post_detail(request, id):
    post = get_object_or_404(Post, id=id)
    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            post = request.data
            serializer = PostSerializer(data=post)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        form = PostForm()
    return Response(PostSerializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([p.IsAuthenticated, ])
def post_edit(request, id):
    post = get_object_or_404(Post, id=id)
    serializer = PostUpdateSerializer(post, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([p.IsAuthenticated, ])
# def post_delete(request, id):
#     post = get_object_or_404(Post, id=id)
#     post.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)
def post_delete(request, id):
    post = get_object_or_404(Post, id=id)
    post.is_deleted = True
    post.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

