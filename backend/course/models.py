from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL 


class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(unique=True)
    duration = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} course with a duration of {self.duration}"
    
