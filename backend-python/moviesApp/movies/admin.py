from django.contrib import admin
from .models import Movie

# Register your models here.
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'category', 'rating', 'date', 'image', 'trailerVideo', 'video')

admin.site.register(Movie, MovieAdmin)