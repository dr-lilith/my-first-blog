import rest_framework.permissions as p
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Comment
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def comment_list(request):
    comments = Comment.objects.filter(is_deleted=False).values()
    return Response(comments, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.AllowAny, ])
def comment_detail(request, id):
    comment = get_object_or_404(Comment, id=id)
    serializer = CommentSerializer(comment)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def comment_new(request):
    serializer = CommentSerializer(data=request.data)
    serializer.initial_data["author"] = request.user.id
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([p.IsAuthenticated, ])
def comment_edit(request, id):
    comment = get_object_or_404(Comment, id=id)
    serializer = CommentUpdateSerializer(comment, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([p.IsAuthenticated, ])
def comment_delete(request, id):
    comment = get_object_or_404(Comment, id=id)
    comment.is_deleted = True
    comment.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

