from django.urls import path
from .views import getAll, getById, create, updateById, deleteById, getAllAdmin, getAllNotAdmin, updatePasswordByEmail, getByUsername
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("getAll", getAll),
    path("getById/<str:id>", getById),
    path("getAllAdmin", getAllAdmin),
    path("getAllNotAdmin", getAllNotAdmin),
    path("getByUsername/<str:username>", getByUsername),
    path("create", create),
    path("updateById/<str:id>", updateById),
    path("updatePasswordByEmail", updatePasswordByEmail),
    path("deleteById/<str:id>", deleteById),
] + static(settings.USERS_MEDIA_URL, document_root=settings.USERS_MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.USERS_MEDIA_URL, document_root=settings.USERS_MEDIA_ROOT)