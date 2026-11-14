from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .serializers import TodoSerializer, ProjectSerializer
from .models import Todo, Project


class ProjectCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProjectDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, project_id):
        project = get_object_or_404(Project, pk=project_id, user=request.user)
        project.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TodoCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):
        project = get_object_or_404(Project, pk=project_id, user=request.user)
        serializer = TodoSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save(project=project)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TodoDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, project_id, todo_id):
        # Todo ownership goes through its project
        todo = get_object_or_404(Todo, pk=todo_id, project_id=project_id, project__user=request.user)
        todo.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)