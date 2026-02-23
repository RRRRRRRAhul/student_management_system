from rest_framework import serializers
from academics.models import Exam, Subject, Marks


class SubjectSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = Subject
        fields = (
            "id",
            "name",
            "code",
            "course",
            "course_name",
            "is_active",
            "created_at",
        )
        read_only_fields = (
            "id",
            "created_at",
        )

    def validate_code(self, value):
        if not value.isupper():
            raise serializers.ValidationError("Code should be uppercase")
        return value


class ExamSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source="subject.name", read_only=True)

    class Meta:
        model = Exam
        fields = (
            "id",
            "subject",
            "name",
            "exam_type",
            "subject_name",
            "max_marks",
            "exam_date",
            "created_at",
            "is_published",
        )
        read_only_fields = (
            "id",
            "created_at",
            "is_published",
        )

    def validate_max_marks(self, data):
        if data <= 0:
            raise serializers.ValidationError("Max marks should be greater than 0")
        return data

    def validate_exam_type(self, data):
        if not data:
            raise serializers.ValidationError("Please choose a exam type from choices")
        return data


class MarksSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.name", read_only=True
    )
    exam_type = serializers.CharField(
        source="exam.exam_type", read_only=True
    )

    class Meta:
        model = Marks
        fields = (
            "id",
            "student",
            "student_name",
            "exam",
            "exam_type",
            "marks_obtained",
            "is_absent",
            "created_at",
        )
        read_only_fields = (
            "id",
            "created_at",
        )

    def create(self, validated_data):
        student = validated_data["student"]
        exam = validated_data["exam"]
        is_absent = validated_data.get("is_absent", False)
        marks_obtained = validated_data.get("marks_obtained", 0)

        if Marks.objects.filter(student=student, exam=exam).exists():
            raise serializers.ValidationError(
                "Marks already entered for this student in this exam."
            )

        if is_absent:
            validated_data["marks_obtained"] = 0
        else:
            
            if marks_obtained > exam.max_marks:
                raise serializers.ValidationError(
                    f"Marks cannot exceed {exam.max_marks}."
                )

        return Marks.objects.create(**validated_data)
        
