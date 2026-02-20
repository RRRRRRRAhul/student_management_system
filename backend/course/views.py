from rest_framework import generics
from course.models import Course
from course.serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated
from student.permissions import AdminCreateOnly

class CoursesListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.order_by("id")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
    

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
