from django.urls import path
from .views import (
    ProjectDeleteView,
    ProjectListView,
    TodoCreateView,
    TodoDeleteView,
)

urlpatterns = [
    path("projects/<int:project_id>/", ProjectDeleteView.as_view(), name="project-delete"),
    path("projects/<int:project_id>/todos/", TodoCreateView.as_view(), name="todo-create"),
    path("project/<int:project_id>/todos/<int:todo_id>/", TodoDeleteView.as_view(), name="todo-delete"),
    path("projects/", ProjectListView.as_view()),
]