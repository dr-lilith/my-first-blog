# Generated by Django 4.0 on 2022-05-08 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, default='/static/noimage.jfif', upload_to='', verbose_name='Avatar'),
        ),
    ]