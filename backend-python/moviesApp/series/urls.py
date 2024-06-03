from django.urls import path
from .views import getAll, getById, create, updateSeriesById, deleteById, createSeasons, createVideos, deleteSeasonById, updateSeasonById, updateVideosById, deleteVideosBySeason
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("getAll", getAll),
    path("getById/<str:id>", getById),
    path("create", create),
    path("createSeasons", createSeasons),
    path("createVideos", createVideos),
    path("updateSeriesById/<str:id>", updateSeriesById),
    path("updateSeasonById/<str:idSeason>", updateSeasonById),
    path("updateVideosById/<str:idVideos>", updateVideosById),
    path("deleteById/<str:id>", deleteById),
    path("deleteSeasonById/<str:id>", deleteSeasonById),
    path("deleteVideosBySeason/<str:idSeason>", deleteVideosBySeason),
] + static( settings.SERIES_MEDIA_URL, document_root=settings.SERIES_MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.SERIES_MEDIA_URL, document_root=settings.SERIES_MEDIA_ROOT)