from django.db import models
from course.models import Course
from student.models import Student

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="subjects"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.name}"
    

class Exam(models.Model):
    EXAM_TYPE_CHOICES = (
        ("midterm", "Mid Term"),
        ("final", "Final"),
        ("internal", "Internal"),
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="exams",
        blank=False,
        null=False
    )
    name = models.CharField(max_length=100)
    exam_type = models.CharField(
        max_length=20,
        choices=EXAM_TYPE_CHOICES
    )
    max_marks = models.PositiveIntegerField()
    exam_date = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject.code} - {self.name}"
    

class Marks(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="marks"
    )
    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE,
        related_name="marks"
    )
    marks_obtained = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    is_absent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "exam")

    def __str__(self):
        return f"{self.student.roll_number} - {self.exam}"
