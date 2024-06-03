from django.urls import path
from .views import getAll, getById, create, updateById, deleteById
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("getAll", getAll),
    path("getById/<str:id>", getById),
    path("create", create),
    path("updateById/<str:id>", updateById),
    path("deleteById/<str:id>", deleteById),
] + static( settings.MOVIES_MEDIA_URL, document_root=settings.MOVIES_MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)