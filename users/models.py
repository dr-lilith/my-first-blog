from __future__ import unicode_literals
from django.conf import settings
from django.db import models, transaction
from django.utils import timezone
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
import os
import hashlib
from functools import partial


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email,and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        with transaction.atomic():
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password=password, **extra_fields)


def upload_to(instance, filename):
    return f'images/{filename}'


class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    """
    email = models.EmailField(max_length=40, unique=True, null=False)
    username = models.CharField(max_length=40, unique=True, null=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to=upload_to, blank=False, null=False, default='images/noimage-300x300.png')

    objects = UserManager()

    USERNAME_FIELD = 'email' or 'username'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self


def hash_file(file, block_size=65536):
    md5sum = hashlib.md5()
    for buf in iter(partial(file.read, block_size), b''):
        md5sum.update(buf)
    return md5sum.hexdigest()


def hash_and_upload(instance, filename):
    #instance.image.open()
    name, ext = os.path.splitext(filename)
    result = 'images/{0}_{1}{2}'.format(instance.user.id, hash_file(instance.image), ext)
    return result


class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name


class Image(models.Model):
    image = models.ImageField(upload_to=hash_and_upload, blank=False, null=False, storage=OverwriteStorage())
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    upload_date = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('image', 'user')

