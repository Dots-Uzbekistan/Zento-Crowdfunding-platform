# Generated by Django 5.1 on 2024-08-22 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20240822_1550'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authuser',
            name='email',
            field=models.EmailField(blank=True, max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='authuser',
            name='full_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
