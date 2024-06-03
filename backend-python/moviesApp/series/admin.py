from django.contrib import admin
from .models import Series, Seasons, Videos

class SeriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'getSeasons')
    def getSeasons(self, obj):
        return ', '.join([season.title for season in obj.seasons.all()])
    
admin.site.register(Series, SeriesAdmin)
