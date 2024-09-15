# Generated by Django 5.1 on 2024-08-21 09:03

import apps.users.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('surname', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(max_length=20, unique=True)),
                ('passport_number', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('passport_document', models.FileField(blank=True, null=True, upload_to=apps.users.models.user_profile_passport_upload_path)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to=apps.users.models.user_profile_image_upload_path)),
                ('bio', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserSavedCampaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('saved_at', models.DateTimeField(auto_now_add=True)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile')),
            ],
        ),
    ]
