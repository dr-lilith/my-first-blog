import rest_framework.permissions as p
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer, PostUpdateSerializer
from .models import Post, Tag, Reaction


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def post_list(request):
    posts = Post.objects.filter(is_deleted=False).values()
    return Response(posts, status=status.HTTP_200_OK)


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
    serializer.initial_data["author_id"] = request.user.id
    serializer.is_valid(raise_exception=True)
    serializer.save()
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

