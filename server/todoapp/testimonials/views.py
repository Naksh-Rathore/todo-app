from .serializers import TestimonialSerializer
from .models import Testimonial
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_all_testimonials(request):
    testimonials = Testimonial.objects.all()
    testimonial_serializer = TestimonialSerializer(testimonials, many=True)

    return Response(testimonial_serializer.data)
        