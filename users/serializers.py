from rest_framework import serializers
from.models import User


class UserSerializer(serializers.ModelSerializer):

    date_joined = serializers.ReadOnlyField()

    class Meta(object):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'date_joined', 'password', 'username', 'description', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}


class RegistrationSerializer(serializers.ModelSerializer):

    date_joined = serializers.ReadOnlyField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta(object):
        model = User
        fields = ('email', 'date_joined', 'password1', 'password2', 'username', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            avatar=self.validated_data['avatar'],
            date_joined=self.validated_data['date_joined'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Пароли должны совпадать.'})
        user.set_password(password)
        user.save()
        return user

