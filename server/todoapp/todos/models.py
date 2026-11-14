from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)

    # Every project is owned by a user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")

class PriorityChoices(models.IntegerChoices):
    Low = 1
    MEDIUM = 2
    HIGH = 3

class Todo(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100, blank=True)
    priority = models.IntegerField(choices=PriorityChoices, blank=True)
    is_done = models.BooleanField(default=False)

    # Every todo is owned by a project
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="todos")