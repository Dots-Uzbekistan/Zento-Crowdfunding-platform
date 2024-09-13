# Generated by Django 5.1 on 2024-08-29 09:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0014_alter_campaign_company_valuation_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampaignFAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
                ('answer', models.TextField()),
                ('order', models.PositiveIntegerField(default=0, help_text='Order of the FAQ')),
                ('is_important', models.BooleanField(default=False, help_text='Mark if this FAQ is important')),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='faqs', to='campaigns.campaign')),
            ],
            options={
                'verbose_name_plural': 'Campaign FAQs',
                'ordering': ['order'],
            },
        ),
    ]