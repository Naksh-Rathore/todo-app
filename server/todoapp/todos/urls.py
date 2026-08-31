from django.urls import path

from .views import TodoCreateView, TodoChangeDoneDelete

urlpatterns = [
    path("", TodoCreateView.as_view()),
    path("<int:todo_id>/", TodoChangeDoneDelete.as_view())
]