from users.serializers import UserSerializer
from posts.serializers import PostSerializer
from rest_framework import serializers
from rest_framework import serializers
from.models import *


class CommentSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Comment
        fields = ('id', 'post_id', 'author_id', 'text', 'created_date', 'is_deleted')


class CommentUpdateSerializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=200)

    class Meta(object):
        model = Comment
        fields = ('text',)

    def update(self, comment, validated_data):
        comment.text = validated_data['text']
        comment.save()
        return comment
