# Generated by Django 5.0.1 on 2024-09-05 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0022_remove_campaign_company_valuation_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
