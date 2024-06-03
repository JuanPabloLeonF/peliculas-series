from django.db import models
import uuid

class Series(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    category = models.JSONField(
        null=False,
        blank=False,
        default=list
    )

class Seasons(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title = models.CharField(
        max_length=100,
        null=False,
        blank=False
    )
    description = models.TextField(
        null=False,
        blank=False
    )
    numberEpisodes = models.IntegerField(
        null=False,
        blank=False
    )
    date = models.DateField(
        null=False,
        blank=False
    )
    rating = models.FloatField(
        null=False,
        blank=False
    )
    img = models.FileField(
        null=False,
        blank=False,
        upload_to='series/media/images/'
    )
    trailerVideo = models.FileField(
        null=False,
        blank=False,
        upload_to='series/media/trailers/'
    )
    
    series = models.ForeignKey(
        Series,
        related_name='seasons',
        on_delete=models.CASCADE,
        db_column='series_FK_series'
    )

class Videos(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title = models.CharField(
        max_length=100,
        null=False,
        blank=False
    )
    description = models.TextField(
        null=False,
        blank=False
    )
    img = models.FileField(
        null=False,
        blank=False,
        upload_to='series/media/listVideos/images/'
    )
    video = models.FileField(
        null=False,
        blank=False,
        upload_to='series/media/listVideos/videos/'
    )
    
    videos = models.ForeignKey(
        Seasons,
        related_name='videos',
        on_delete=models.CASCADE,
        db_column='videos_FK_seasons'
    )