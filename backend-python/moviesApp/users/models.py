from django.db import models
import uuid

class Users(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    username = models.CharField(
        max_length=255,
        blank=False,
        null=False,
        unique=True
    )
    name = models.CharField(
        max_length=255,
        blank=False,
        null=False
    )
    email = models.EmailField(
        max_length=255, 
        unique=True,
        blank=False,
        null=False
    )
    
    admin = models.BooleanField(
        null=False,
        blank=False
    )
    
    password = models.CharField(
        max_length=255,
        blank=False,
        null=False
    )
    
    image = models.FileField(
        null=True,
        blank=True,
        upload_to='users/media/'
    )

    def __str__(self):
        return self.name