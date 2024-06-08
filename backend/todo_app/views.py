from django.shortcuts import render
from .models import Todo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from .serializers import TodoSerializer

# Create your views here.
class todoApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # import pdb;pdb.set_trace()
            with transaction.atomic():
                todo_serializer = TodoSerializer(data=request.data)
                if todo_serializer.is_valid():
                    todo_serializer.save()
                    return Response({'detail': 'Success'}, status=status.HTTP_200_OK)
                return Response({'detail': 'Failure', 'msg': todo_serializer.errors}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    def get(self, request):
        try:
            if request.GET.get('id'):
                todo_instance = Todo.objects.filter(id=request.GET.get('id')).first()
                if not todo_instance:
                    return Response({'detail': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
                serializer = TodoSerializer(todo_instance)
            else:
                todo_instances = Todo.objects.all()
                serializer = TodoSerializer(todo_instances, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        id = request.data
        Todo.objects.filter(id = id).delete()
        return Response(status = status.HTTP_200_OK)
        
    def put(self, request):
        try:
            todo_id = request.data.get('id')
            todo_instance = Todo.objects.get(id=todo_id)
            
            todo_serializer = TodoSerializer(instance=todo_instance, data=request.data, partial=True)
            if todo_serializer.is_valid():
                todo_serializer.save()
                
                return Response({'msg': 'Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)