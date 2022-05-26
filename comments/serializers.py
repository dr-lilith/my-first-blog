from users.serializers import UserSerializer
from posts.serializers import PostSerializer
from rest_framework import serializers
from rest_framework import serializers
from.models import *


class CommentSerializer(serializers.ModelSerializer):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = serializers.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    class Meta(object):
        model = Comment
        fields = ('id', 'postId', 'author', 'text', 'created_date', 'published_date', 'is_deleted')


class CommentUpdateSerializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=200)

    class Meta(object):
        model = Comment
        fields = ('text',)

    def update(self, comment, validated_data):
        comment.text = validated_data['text']
        comment.save()
        return comment
