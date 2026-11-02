from .serializers import TestimonialSerializer
from .models import Testimonial
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_all_testimonials(request):
    testimonial = Testimonial.objects.all()
    testimonial_serializer = TestimonialSerializer(testimonial)

    return Response(testimonial_serializer.data)
    