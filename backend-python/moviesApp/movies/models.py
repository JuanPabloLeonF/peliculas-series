from django.db import models
import uuid

class Movie(models.Model):
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
    category = models.JSONField(
        null=False,
        blank=False, 
        default=list
    )
    rating = models.FloatField(
        null=False,
        blank=False
    )
    date = models.DateField(
        null=False,
        blank=False
    )
    image = models.FileField(
        null=False,
        blank=False,
        upload_to='movies/media/images/',
        
    )
    trailerVideo = models.FileField(
        null=False,
        blank=False,
        upload_to='movies/media/trailers/',
    )
    video = models.FileField(
        null=False,
        blank=False,
        upload_to='movies/media/videos/',
    )
    
    def __str__(self) -> str:
        return f"title: {self.title}, description: {self.description}, category: {self.category}, rating: {self.rating}, date: {self.date}, image: {self.image}, trailerVideo: {self.trailerVideo}, video: {self.video}"