from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status
from .responseError import ResponseError
from django.core.exceptions import ObjectDoesNotExist, ValidationError

@api_view(["GET"])
def getAll(request):
    listMovies = Movie.objects.all()
    serializer = MovieSerializer(listMovies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def getById(request, id):
    try:
        movie = Movie.objects.get(id=id)
        serializer = MovieSerializer(movie)
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
        serializer = MovieSerializer(data=request.data)
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
def updateById(request, id):
    try:
        movie = Movie.objects.get(id=id)
        serializer = MovieSerializer(movie, data=request.data)
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
        movie = Movie.objects.get(id=id)
        movie.delete()
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