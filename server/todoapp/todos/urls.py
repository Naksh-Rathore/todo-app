from django.urls import path
from .views import (
    ProjectCreateView,
    ProjectDeleteView,
    TodoCreateView,
    TodoDeleteView,
)

urlpatterns = [
    path("projects/", ProjectCreateView.as_view(), name="project-create"),
    path("projects/<int:project_id>/", ProjectDeleteView.as_view(), name="project-delete"),
    path("projects/<int:project_id>/todos/", TodoCreateView.as_view(), name="todo-create"),
    path("project/<int:project_id>/todos/<int:todo_id>/", TodoDeleteView.as_view(), name="todo-delete"),
]