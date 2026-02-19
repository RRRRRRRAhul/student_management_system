from rest_framework import serializers
from course.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "code",
            "duration",
            "is_active",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def validate_name(self, data):
        if data is None:
            raise serializers.ValidationError("Course name is required")
        elif len(data) < 3:
            raise serializers.ValidationError(
                "Course name must be at least 3 characters long"
            )
        return str(data)

    def validate_code(self, data):
        if data is None:
            raise serializers.ValidationError("Course code is required")
        elif len(data) < 2:
            raise serializers.ValidationError(
                "Course code must be at least 2 characters long"
            )
        elif not data.isupper():
            raise serializers.ValidationError(
                "Course code must be in uppercase letters"
            )
        elif " " in data:
            raise serializers.ValidationError("Course code must not contain spaces")
        elif not data.isalnum():
            raise serializers.ValidationError("Course code must be alphanumeric")
        return str(data)

    def validate_duration(self, data):
        if data <= 0:
            raise serializers.ValidationError(
                "Course duration must be greater than zero"
            )
        elif data > 100:
            raise serializers.ValidationError(
                "Course duration must be less than 100 months"
            )
        return data
