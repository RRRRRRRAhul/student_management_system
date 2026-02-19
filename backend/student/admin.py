from django.contrib import admin
from student.models import Student, StudentApplication


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "roll_number",
        "email",
        "course",
        "admission_date",
        "is_active",
    )

    list_filter = (
        "course",
        "is_active",
        "admission_date",
    )

    search_fields = (
        "name",
        "roll_number",
        "user__email",
    )

    ordering = ("-admission_date",)

    autocomplete_fields = ("user", "course")

    list_editable = ("is_active",)

@admin.register(StudentApplication)
class StudentApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "full_name",
        "course",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "course",
        "created_at",
    )

    search_fields = (
        "full_name",
        "user__email",
        "user__username",
    )

    readonly_fields = (
        "user",
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)