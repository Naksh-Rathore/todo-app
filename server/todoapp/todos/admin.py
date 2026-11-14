from django.contrib import admin
from .models import Todo, Project 

# Register your models here.
admin.site.register(Project)
admin.site.register(Todo)