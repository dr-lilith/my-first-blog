from rest_framework import serializers
from.models import Post, Reaction


class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField('count_likes')
    dislikes = serializers.SerializerMethodField('count_dislikes')
    my_like = serializers.SerializerMethodField('get_my_like')

    def count_likes(self, post):
        return Reaction.objects.filter(post=post, vote=True).count()

    def count_dislikes(self, post):
        return Reaction.objects.filter(post=post, vote=False).count()

    def get_my_like(self, post):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        if not user or user.is_anonymous:
            return None
        reaction = Reaction.objects.filter(post=post, user=user).first()
        if not reaction:
            return None
        return reaction.vote

    class Meta(object):
        model = Post
        fields = ('id', 'author_id', 'title', 'text',
                  'created_date', 'published_date', 'is_deleted', 'likes', 'dislikes', 'my_like')


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


class UploadPostPhotoSerializer(serializers.ModelSerializer):
    post_photo = serializers.ImageField(required=True)

    class Meta(object):
        model = Post
        fields = ['post_photo']
