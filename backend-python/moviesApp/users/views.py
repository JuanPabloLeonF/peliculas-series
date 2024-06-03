from django.shortcuts import render
from .models import Users
from .serializers import UsersSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from .responseError import ResponseError

@api_view(["GET"])
def getAll(request):
    listUsers = Users.objects.all()
    serializer = UsersSerializer(listUsers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(["GET"])
def getById(request, id):
    try:
        user = Users.objects.get(id=id)
        serializer = UsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el usuario")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    
@api_view(["GET"])
def getAllAdmin(request):
    listUsers = Users.objects.filter(admin=True)
    serializer = UsersSerializer(listUsers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(["GET"])
def getAllNotAdmin(request):
    listUsers = Users.objects.filter(admin=False)
    serializer = UsersSerializer(listUsers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def getByUsername(request, username):
    try:
        user = Users.objects.get(username=username)
        serializer = UsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el usuario")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    
@api_view(["POST"])
def create(request):
    try:
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            responseError = ResponseError()
            responseError.setDetail("Error en los datos no son validos")
            responseError.setStatus("Bad Request")
            responseError.setCode(status.HTTP_400_BAD_REQUEST)
            return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    except ValidationError:
        responseError = ResponseError()
        responseError.setDetail("Error en los datos no son validos")
        responseError.setStatus("Bad Request")
        responseError.setCode(status.HTTP_400_BAD_REQUEST)
        return Response(responseError.to_dict(), status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["PUT"])
def updateById(request, id):
    try:
        user = Users.objects.get(id=id)
        serializer = UsersSerializer(user, data=request.data)
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
        responseError.setDetail("No existe el usuario")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    
@api_view(["PATCH"])
def updatePasswordByEmail(request):
    try:
        user = Users.objects.get(email=request.data.get("email"))
        user.password = request.data.get("password")
        user.save()
        serializer = UsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el usuario")
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
def deleteById(request, id):
    try:
        user = Users.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist:
        responseError = ResponseError()
        responseError.setDetail("No existe el usuario con el id: " + id)
        responseError.setStatus("Not Found")
        responseError.setCode(status.HTTP_404_NOT_FOUND)
        return Response(responseError.to_dict(), status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        responseError = ResponseError()
        responseError.setDetail("Error en el servidor")
        responseError.setStatus("Server Error")
        responseError.setCode(status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(responseError.to_dict(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
