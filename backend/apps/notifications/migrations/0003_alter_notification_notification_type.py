# Generated by Django 5.0.1 on 2024-09-11 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_alter_notification_options_remove_notification_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notification_type',
            field=models.CharField(choices=[('admin_message', 'Admin Message'), ('campaign_update', 'Campaign Update'), ('collaboration_request', 'Collaboration Request'), ('campaign_funded', 'Campaign Funded')], default='admin_message', max_length=50),
        ),
    ]
