# Generated by Django 5.0.6 on 2024-05-24 13:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('series', '0002_remove_seasons_videos_remove_series_seasons_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seasons',
            name='series',
            field=models.ForeignKey(db_column='series_FK_series', on_delete=django.db.models.deletion.CASCADE, related_name='seasons', to='series.series'),
        ),
        migrations.AlterField(
            model_name='videos',
            name='videos',
            field=models.ForeignKey(db_column='videos_FK_seasons', on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='series.seasons'),
        ),
    ]
