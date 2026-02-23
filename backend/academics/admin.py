from django.contrib import admin
from .models import Subject, Exam, Marks

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "code",
        "course",
        "is_active",
        "created_at",
    )
    list_filter = ("course", "is_active")
    search_fields = ("name", "code")
    ordering = ("-created_at",)

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "subject",
        "exam_type",
        "max_marks",
        "is_published",
        "created_at",
    )
    list_filter = ("exam_type", "is_published", "subject")
    search_fields = ("name", "subject__name")
    ordering = ("-created_at",)

@admin.register(Marks)
class MarksAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "student",
        "exam",
        "marks_obtained",
        "is_absent",
        "created_at",
    )
    list_filter = ("is_absent", "exam")
    search_fields = ("student__roll_number", "student__name")
    ordering = ("-created_at",)