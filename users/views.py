from django.shortcuts import render
from rest_framework.views import APIView
import rest_framework.permissions as p
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status


class CreateUserAPIView(APIView):
    # Allow any user (authenticated or not) to access this url
    permission_classes = (p.AllowAny,)

    def post(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
