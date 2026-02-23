from rest_framework import generics
from academics.serializers import SubjectSerializer, ExamSerializer, MarksSerializer
from academics.models import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from student.permissions import AdminCreateOnly, IsOwnerStudent

class SubjectListCreateView(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.select_related("course").order_by("-created_at")
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
        
class SubjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.select_related("course").order_by("-created_at")
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
    
class ExamListCreateView(generics.ListCreateAPIView):
    serializer_class = ExamSerializer
    queryset = Exam.objects.select_related("subject").order_by("-created_at")
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
    
class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExamSerializer
    queryset = Exam.objects.select_related("subject").order_by("-created_at")
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated(), AdminCreateOnly()]
        return [IsAuthenticated()]
    
class MarksListCreateView(generics.ListCreateAPIView):
    serializer_class = MarksSerializer
    queryset = Marks.objects.select_related("student", "exam").order_by("-created_at")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()] 
        return [IsAdminUser()]
    
class MarksDeatailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MarksSerializer
    queryset = Marks.objects.select_related("student", "exam").order_by("-created_at")
    permission_classes = [IsAdminUser]
    


    


