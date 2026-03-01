from django.db import models
from django.conf import settings
from course.models import Course
from django.db.models import Max
from datetime import date
from rest_framework import serializers

User = settings.AUTH_USER_MODEL


class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_profile"
    )
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=30, unique=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, related_name="students")
    admission_date = models.DateField()
    is_active = models.BooleanField(default=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        if not self.pk and Student.objects.filter(user=self.user).exists():
            raise serializers.ValidationError(
                "This user already has a student profile."
            )
        

        if not self.roll_number:
            last_roll = Student.objects.aggregate(
                max_roll=Max("roll_number")
            )["max_roll"]

            if last_roll:
                last_number = int(last_roll.split("-")[-1])
                new_number = last_number + 1
            else:
                new_number = 1

            self.roll_number = f"STU-{date.today().year}-{new_number:04d}"

        super().save(*args, **kwargs)

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


