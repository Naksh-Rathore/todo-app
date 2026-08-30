from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import TodoSerializer
from .models import Todo

class TodoCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TodoSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save(user=request.user)

            return Response(
                {"message": "Todo created successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request):
        todos = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(todos, many=True)

        return Response(serializer.data)

class TodoChangeDone(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, todo_id):
        todo = Todo.objects.get(id=todo_id, user=request.user)
        todo.is_done = not todo.is_done

        todo.save()

        return Response({"message": "Todo changed successfully"}, status=status.HTTP_201_CREATED)