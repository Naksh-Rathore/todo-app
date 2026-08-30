from django.urls import path

from .views import TodoCreateView, TodoChangeDone

urlpatterns = [
    path("", TodoCreateView.as_view()),
    path("<int:todo_id>/", TodoChangeDone.as_view())
]