from django.db import models

# Create your models here.
class Testimonial(models.Model):
    name = models.CharField(max_length=50)
    review = models.TextField()
    image = models.ImageField(upload_to='images/')