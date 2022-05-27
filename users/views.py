from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
import rest_framework.permissions as p
from .serializers import UserSerializer, RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from . models import User
from rest_framework_simplejwt.tokens import *
from django.contrib.auth.signals import user_logged_in
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([p.AllowAny, ])
def create_user(request):
    user = request.data
    serializer = RegistrationSerializer(data=user)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([p.AllowAny, ])
def authenticate_user(request):
    try:
        email = request.data['email']
        password = request.data['password']
        user = User.objects.get(email=email, password=password)
        if user:
            tokens = get_tokens_for_user(user)
            user_details = {
                'name': f"{user.first_name} {user.last_name}",
                'token': tokens["access"],
                'refresh_token': tokens["refresh"]
            }
            #TODO figure out purpose of below
            user_logged_in.send(sender=user.__class__, request=request, user=user)
            return Response(user_details, status=status.HTTP_200_OK)
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)


@api_view(['GET'])
@permission_classes([p.IsAuthenticated, ])
def get_user(request, id):
    user = get_object_or_404(User, id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([p.IsAdminUser, ])
def get_users(request):
    users = User.objects.all().values()
    return Response(users, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([p.IsAuthenticated, ])
def update_user(request):
    serializer_data = request.data.get('user', request.data)
    serializer = UserSerializer(request.user, data=serializer_data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([p.IsAuthenticated, ])
def upload_avatar(request, id):
    if not id:
        id = request.user.id
    if request.user.id == id or request.user.is_superuser:
        first_key = request.FILES.keys[0]
        uploaded_file = request.FILES[first_key]
        print("")

    return Response(status=status.HTTP_200_OK)

