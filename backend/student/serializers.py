from rest_framework import serializers
from student.models import Student, StudentApplication
from datetime import date, timedelta
from django.db.models import Max
from course.serializers import CourseSerializer


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        read_only_fields = (
            "id",
            "user",
            "roll_number",
            "is_active",
            "created_at",
            "updated_at",
        )

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Student Name is required")
        elif len(value) < 2:
            raise serializers.ValidationError(
                "Student Name must be higher than 2 characters"
            )
        return value

    def validate_course(self, value):
        if value is None:
            raise serializers.ValidationError("Course must exist and not null")
        return value

    def validate_admission_date(self, value):
        today = date.today()
        if value > today:
            raise serializers.ValidationError("Admission date cannot be in the future")
        return value

    def create(self, validated_data):
        # 1️ Get logged-in user from context
        request = self.context.get("request")
        user = request.user

        # 2️ Ensure one-to-one constraint (one user → one student)
        if hasattr(user, "student_profile"):
            raise serializers.ValidationError("This user already has a student profile")

        # 3️ Generate roll number
        last_roll = Student.objects.aggregate(max_roll=Max("roll_number"))["max_roll"]

        if last_roll:
            last_number = int(last_roll.split("-")[-1])
            new_number = last_number + 1
        else:
            new_number = 1

        roll_number = f"STU-{date.today().year}-{new_number:04d}"

        # 4️ Create student with backend-controlled fields
        student = Student.objects.create(
            user=user, roll_number=roll_number, **validated_data
        )

        return student


class StudentApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = "__all__"
        read_only_fields = (
            "id",
            "user",
            "status",
            "remarks",
            "admission_date",
            "created_at",
            "updated_at",
        )

    def validate_full_name(self, data):
        if data is None:
            raise serializers.ValidationError("Full name of the Student is required")
        elif len(data) < 4:
            raise serializers.ValidationError("Full name must be 4 character")
        return str(data)

    def validate_course(self, data):
        if data is None:
            raise serializers.ValidationError("Course must exist and not be null")
        return data

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        if hasattr(user, "student_application"):
            raise serializers.ValidationError("This user already has a student application")

        student_application = StudentApplication.objects.create(
            user=user, status="pending", **validated_data
        )

        return student_application
    
class StudentApplicationReadSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_id = serializers.IntegerField(source="course.id", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    class Meta:
        model = StudentApplication
        fields = [
            "id",
            "full_name",
            "email",
            "course_id",
            "course_name",
            "status",
            "remarks",
            "admission_date",
            "created_at",
            "updated_at",
        ]
        read_only_fields = (
            "id",
            "user",
            "full_name",
            "course",
            "status",
            "remarks",
            "admission_date",
            "created_at",
            "updated_at",
        )

class StudentApplicationAdminApproveSerializer(serializers.Serializer):
    choices = serializers.ChoiceField(choices=["approve", "reject"])
    remarks = serializers.CharField(required=False, allow_blank=True)

    # If admin rejecting application, remarks are mandatory
    def validate(self, attrs):
        if attrs['choices'] == "reject" and not attrs['remarks']:
            raise serializers.ValidationError(
                {"remarks": "Remarks are required when rejecting an application."}
            )
    
        return attrs
