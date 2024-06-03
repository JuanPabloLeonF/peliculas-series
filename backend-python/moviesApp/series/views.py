from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Series, Seasons, Videos
from .serializers import SeriesSerializer, SeasonsSerializer, VideosSerializer
from rest_framework import status
from .responseError import ResponseError
from django.core.exceptions import ObjectDoesNotExist, ValidationError

@api_view(["GET"])
def getAll(request):
    listSeries = Series.objects.all()
    serializer = SeriesSerializer(listSeries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def getById(request, id):
    try:
        series = Series.objects.get(id=id)
        serializer = SeriesSerializer(series)
        return Response(serializer.data, status=200)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail(f"No encontrado con el id: {id}")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except ValidationError:
        responseError = ResponseError()
        responseError.setDetail(f"No encontrado con el id: {id}")
        responseError.setStatus("Bad Request")
        responseError.setCode(status.HTTP_400_BAD_REQUEST)
        return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        responseError = ResponseError()
        responseError.setDetail(f"No encontrado con el id: {id}")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def create(request):
    try:
        serializer = SeriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
def createSeasons(request):
    try:
        serializer = SeasonsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
def createVideos(request):
    try:
        serializer = VideosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
def updateSeriesById(request, id):
    try:
        series = Series.objects.get(id=id)
        serializer = SeriesSerializer(series, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el registro")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["PUT"])
def updateSeasonById(request, idSeason):
    try:
        idSeries = request.data.get("series")
        season = Seasons.objects.get(id=idSeason, series_id=idSeries)
        serializer = SeasonsSerializer(season, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el registro")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["PUT"])  
def updateVideosById(request, idVideos):
    try:
        idSeason = request.data.get("videos")
        video = Videos.objects.get(id=idVideos, videos_id=idSeason)
        serializer = VideosSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el registro")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
def deleteById(request, id):
    try:
        series = Series.objects.get(id=id)
        series.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el registro con el id: " + id)
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["DELETE"])
def deleteSeasonById(request, id):
    try:
        season = Seasons.objects.get(id=id)
        series_id = season.series.id 
        season.delete()

        if not Seasons.objects.filter(series_id=series_id).exists():
            series = Series.objects.get(id=series_id)
            series.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el registro con el id: " + str(id))
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(["DELETE"])
def deleteVideosBySeason(request, idSeason):
    try:
        season = Seasons.objects.get(id=idSeason)
        videos = Videos.objects.filter(videos=season)
        videos.delete()
        return Response( status=status.HTTP_204_NO_CONTENT)
    except Seasons.DoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe la temporada")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

