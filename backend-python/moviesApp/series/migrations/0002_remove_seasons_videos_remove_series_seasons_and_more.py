# Generated by Django 5.0.6 on 2024-05-24 13:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('series', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seasons',
            name='videos',
        ),
        migrations.RemoveField(
            model_name='series',
            name='seasons',
        ),
        migrations.AddField(
            model_name='seasons',
            name='series',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='seasons', to='series.series'),
        ),
        migrations.AddField(
            model_name='videos',
            name='videos',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='series.seasons'),
        ),
    ]
