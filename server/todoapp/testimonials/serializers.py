from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.Serializer):
    class Meta:
        model = Testimonial
        fields = ["name", "review", "image"]
        read_only_fields = ["name", "review", "image"]