# Generated by Django 5.1 on 2024-08-22 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0007_alter_campaigncategory_name_alter_campaigntag_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaignnews',
            name='title',
            field=models.CharField(default='New title', max_length=255),
            preserve_default=False,
        ),
    ]
