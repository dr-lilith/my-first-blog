from django.conf import settings
from django.db import models
from django.utils import timezone


class Post(models.Model):
    author_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=False, blank=False)
    text = models.TextField(null=False, blank=False)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False, null=False)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class Tag(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tag = models.CharField(max_length=200, null=False, blank=False)

    class Meta:
        unique_together = ('post', 'author',)

    def __str__(self):
        return self.tag

class Reaction(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vote = models.BooleanField(blank=True, null=True)

    class Meta:
        unique_together = ('post', 'user',)

    def __str__(self):
        return self.vote