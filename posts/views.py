import rest_framework.permissions as p
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer, PostUpdateSerializer, UploadPostPhotoSerializer
from .models import Post, Tag, Reaction
import urllib.request
from django.core.files import File
import os
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def paging_posts(request):
    posts = Post.objects.filter(is_deleted=False).values()
    page_num = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('size', 10))
    paginator = Paginator(posts, page_size)
    try:
        page_posts = paginator.page(page_num)
    except PageNotAnInteger:
        page_posts = paginator.page(1)
    except EmptyPage:
        return Response({}, status=status.HTTP_200_OK)
    return Response(page_posts.object_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def post_list(request):
    posts = Post.objects.filter(is_deleted=False).values()
    return Response(posts, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.IsAuthenticated, ])
def user_posts(request):
    user = request.user
    posts = Post.objects.filter(is_deleted=False, author_id=user).values()
    page_num = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('size', 10))
    paginator = Paginator(posts, page_size)
    try:
        page_posts = paginator.page(page_num)
    except PageNotAnInteger:
        page_posts = paginator.page(1)
    except EmptyPage:
        return Response({}, status=status.HTTP_200_OK)
    return Response(page_posts.object_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.IsAuthenticatedOrReadOnly, ])
def post_detail(request, id):
    post = get_object_or_404(Post, id=id)
    serializer = PostSerializer(post, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def post_new(request):
    serializer = PostSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(author=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


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
def post_delete(request, id):
    post = get_object_or_404(Post, id=id)
    post.is_deleted = True
    post.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def like(request, id):
    post = get_object_or_404(Post, id=id)
    user = request.user
    reaction = Reaction.objects.filter(post=post, user=user).first()
    if not reaction:
        reaction = Reaction()
        reaction.post = post
        reaction.user = user
    reaction.vote = True
    reaction.save()
    return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.IsAuthenticated, ])
def mylike(request, id):
    post = get_object_or_404(Post, id=id)
    user = request.user
    reaction = Reaction.objects.filter(post=post, user=user).first()
    result = True if reaction else False
    return Response({"mylike": result}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def dislike(request, id):
    post = get_object_or_404(Post, id=id)
    user = request.user
    reaction = Reaction.objects.filter(post=post, user=user).first()
    if not reaction:
        reaction = Reaction()
        reaction.post = post
        reaction.user = user
    reaction.vote = False
    reaction.save()
    return Response({}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([p.IsAuthenticated, ])
def cancel_reaction(request, id):
    post = get_object_or_404(Post, id=id)
    user = request.user
    reaction = Reaction.objects.filter(post=post, user=user).first()
    if reaction:
        reaction.delete()
    return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.IsAuthenticated, ])
def search_tag(request, id):
    tag_list = Tag.objects.filter(tag__startswith=request.data['tag']).values()[:10]
    return Response({tag_list}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def add_tag(request, id):
    post = get_object_or_404(Post, id=id)
    if post.author.id != request.user.id:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    new_tag = Tag.objects.filter(tag=request.data['tag']).first()
    if not new_tag:
        new_tag = Tag()
        new_tag.tag = request.data['tag']
        new_tag.author = request.user
        new_tag.save()
    post.tag.add(new_tag)
    return Response({}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([p.IsAdminUser, ])
def delete_tag(request, id):
    post = get_object_or_404(Post, id=id)
    removable_tag = Tag.objects.filter(tag=request.data['tag'], post=post).first()
    if removable_tag:
        post.tag.remove(removable_tag)
        post.save()
    return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def search_by_tag(request):
    searched_tag = Tag.objects.filter(tag=request.data['tag']).first()
    searched_posts = Post.objects.filter(tag=searched_tag).all()
    return Response(searched_posts.values(), status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def upload_post_photo(request, id):
    serializer = UploadPostPhotoSerializer(request.user, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def upload_post_photo_from_url(request, id):
    post = get_object_or_404(Post, id=id)
    photo_url = request.data.get('url')
    result = urllib.request.urlretrieve(photo_url)
    post.post_photo.save(
        f'{post.id}-{os.path.basename(photo_url)}',
        File(open(result[0], 'rb'))
    )
    post.save()

    return Response({}, status=status.HTTP_200_OK)
