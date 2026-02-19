from django.shortcuts import render
from rest_framework import generics
from student.models import Student, StudentApplication
from student.serializers import (
    StudentSerializer,
    StudentApplicationCreateSerializer,
    StudentApplicationReadSerializer,
    StudentApplicationAdminApproveSerializer,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from student.permissions import AdminCreateOnly, IsOwnerStudent
from rest_framework.views import APIView
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status 
from datetime import date, timedelta


class StudentsListCreateView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, AdminCreateOnly]

    def get_queryset(self):
        # get the user from the JWT
        user = self.request.user

        # Admin can see all students
        if user.is_staff:
            return Student.objects.select_related("user", "course")

        # Student can see only their own profile
        return Student.objects.filter(user=user).select_related("user", "course")


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.select_related("user", "course")
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

class StudentApplicationReadCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return StudentApplicationCreateSerializer
        return StudentApplicationReadSerializer
    
    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return StudentApplication.objects.select_related("user", "course")
        
        return StudentApplication.objects.filter(user=user).select_related("user", "course")


class StudentApplicationApproveView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk, *args, **kwargs):
        # 1️ Fetch the application
        try:
            application = StudentApplication.objects.select_related("user", "course").get(pk=pk)
        except StudentApplication.DoesNotExist:
            return Response({"detail": "Application not found."}, status=status.HTTP_404_NOT_FOUND)

        # 2️ Check if already processed
        if application.status != "pending":
            return Response({"detail": f"Application already {application.status}."},
                            status=status.HTTP_400_BAD_REQUEST)

        # 3️ Validate the admin input
        serializer = StudentApplicationAdminApproveSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        choice = serializer.validated_data["choices"]
        remarks = serializer.validated_data.get("remarks", "")

        # 4️ Perform action inside a transaction
        with transaction.atomic():
            if choice == "approve":
                # Update the application
                application.status = "approved"
                application.admission_date = date.today()
                application.remarks = remarks
                application.save()

                if Student.objects.filter(user=application.user).exists():
                    return Response(
                        {"detail": "Student already exists for this user."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Create the actual Student
                Student.objects.create(
                    user=application.user,
                    name=application.full_name,
                    email = application.user.email,
                    course=application.course,
                    admission_date=application.admission_date,
                    is_active=True
                )

            elif choice == "reject":
                application.status = "rejected"
                application.remarks = remarks
                application.save()

        return Response({"detail": f"Application {choice}d successfully."}, status=status.HTTP_200_OK)