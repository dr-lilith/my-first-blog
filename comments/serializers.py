from users.serializers import UserSerializer
from rest_framework import serializers
# from.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

    class Meta(object):
        # model = Comment
        fields = ('id', 'author', 'text', 'created')
