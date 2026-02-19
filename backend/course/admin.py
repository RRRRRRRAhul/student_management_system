from django.contrib import admin
from course.models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    model = Course

    list_display = (
        "id",
        "name",
        "code",
        "is_active",
        "created_at",
    )

    list_filter = ("is_active",)
    search_fields = ("name", "code")
    ordering = ("-created_at",)
