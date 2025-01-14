# Generated by Django 5.1 on 2024-08-28 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0013_campaign_company_valuation_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='company_valuation',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Valuation of the company (for equity-based campaigns)', max_digits=15, null=True, verbose_name='Company Valuation in USD'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='equity_percentage',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Total equity offered in %', max_digits=5, null=True, verbose_name='Equity %'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='interest_rate',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Interest rate for debt-based campaigns', max_digits=5, null=True, verbose_name='Interest Rate %'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='repayment_period_months',
            field=models.IntegerField(blank=True, help_text='Repayment period in months for the debt-based campaign', null=True, verbose_name='Repayment Period (Months)'),
        ),
    ]
