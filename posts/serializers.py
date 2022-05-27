from rest_framework import serializers
from.models import Post


class PostSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Post
        fields = ('id', 'author_id', 'title', 'text',
                  'created_date', 'published_date', 'is_deleted')


class PostUpdateSerializer(serializers.ModelSerializer):

    title = serializers.CharField(max_length=200)
    text = serializers.CharField()

    class Meta(object):
        model = Post
        fields = ('title', 'text')

    def update(self, post, validated_data):
        post.title = validated_data['title']
        post.text = validated_data['text']
        post.save()
        return post
