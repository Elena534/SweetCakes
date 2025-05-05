from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Desert(models.Model):
    CATEGORY_CHOICES = [
        ('cheesecake', 'Чизкейк'),
        ('mochi', 'Моти'),
        ('macaron', 'Макарунс'),
        ('pastry', 'Пирожное'),
        ('cake', 'Торт'),
    ]
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.name} | {self.category} | {self.price}"

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.username} | {self.phone} | {self.email} "