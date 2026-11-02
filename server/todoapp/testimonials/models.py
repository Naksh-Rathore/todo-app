from django.db import models

# Create your models here.
class Testimonial(models.Model):
    name = models.CharField(max_length=50)
    review = models.TextField()
    imageURL = models.URLField(max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)