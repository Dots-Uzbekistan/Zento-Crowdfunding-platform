# Generated by Django 5.1 on 2024-08-21 09:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile'),
        ),
        migrations.AddField(
            model_name='campaignmedia',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign'),
        ),
        migrations.AddField(
            model_name='campaignnews',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign'),
        ),
        migrations.AddField(
            model_name='campaignnewsmedia',
            name='campaign_news',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaignnews'),
        ),
        migrations.AddField(
            model_name='campaignrating',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign'),
        ),
        migrations.AddField(
            model_name='campaignrating',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile'),
        ),
        migrations.AddField(
            model_name='campaignteammember',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign'),
        ),
        migrations.AddField(
            model_name='campaignvisit',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign'),
        ),
        migrations.AddField(
            model_name='campaignvisit',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile'),
        ),
    ]
