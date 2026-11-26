from rest_framework import serializers
from .models import Todo, Project

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
        read_only_fields = ["project"]


class ProjectSerializer(serializers.ModelSerializer):
    # Add the todos as a field so it shows up in ProjectListView
    # It is placed outside of Meta as it is a field, and Meta stores settings of how to build the model automatically
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["user"]