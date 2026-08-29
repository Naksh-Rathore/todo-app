from django.db import models
from django.contrib.auth.models import User

class PriorityChoices(models.IntegerChoices):
    Low = 1
    MEDIUM = 2
    HIGH = 3

class Todo(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100, blank=True, null=True)
    priority = models.IntegerField(choices=PriorityChoices, blank=True, null=True)
    is_done = models.BooleanField(default=False)

    # So every user has todos
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")