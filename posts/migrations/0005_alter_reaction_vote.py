# Generated by Django 4.0 on 2022-06-02 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_reaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reaction',
            name='vote',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]