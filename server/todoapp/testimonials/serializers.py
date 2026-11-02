from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["name", "review", "image", "imageURL"]
        read_only_fields = ["name", "review", "image", "imageURL"]