from django.urls import path
from student.views import (
    StudentDetailView,
    StudentsListCreateView,
    StudentApplicationReadCreateView,
    StudentApplicationApproveView,
    SubjectsByStudentView,
    ExamsByStudentView,
    MarksByStudentView
)

urlpatterns = [
    path("", StudentsListCreateView.as_view()),
    path("<int:pk>/", StudentDetailView.as_view()),
    path("applications/", StudentApplicationReadCreateView.as_view()),
    path("applications/<int:pk>/approve/", StudentApplicationApproveView.as_view()),
    path("subjects/", SubjectsByStudentView.as_view()),
    path('exams/', ExamsByStudentView.as_view()),
    path('marks/', MarksByStudentView.as_view())
]
