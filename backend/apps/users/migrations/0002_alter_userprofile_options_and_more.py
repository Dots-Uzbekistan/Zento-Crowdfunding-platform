# Generated by Django 5.1 on 2024-08-21 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0007_alter_campaigncategory_name_alter_campaigntag_name_and_more'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userprofile',
            options={'verbose_name_plural': 'User Profiles'},
        ),
        migrations.AlterModelOptions(
            name='usersavedcampaign',
            options={'verbose_name_plural': 'User Saved Campaigns'},
        ),
        migrations.AlterUniqueTogether(
            name='usersavedcampaign',
            unique_together={('user', 'campaign')},
        ),
    ]
