from django.db import models
from django.conf import settings
from course.models import Course

User = settings.AUTH_USER_MODEL


class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_profile"
    )
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=30, unique=True)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, related_name="students")
    admission_date = models.DateField()
    is_active = models.BooleanField(default=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class StudentApplication(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_application"
    )
    full_name = models.CharField(max_length=100)
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name="applications"
    )
    admission_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="pending"
    )
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


