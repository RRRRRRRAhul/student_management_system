from django.urls import path
from academics.views import (
    SubjectListCreateView,
    SubjectDetailView,
    ExamListCreateView,
    ExamDetailView,
    MarksListCreateView,
    MarksDeatailView,
)

urlpatterns = [
    path("subjects/", SubjectListCreateView.as_view()),
    path("subjects/<int:pk>/", SubjectDetailView.as_view()),

    path("exams/", ExamListCreateView.as_view()),
    path("exams/<int:pk>/", ExamDetailView.as_view()),

    path("marks/", MarksListCreateView.as_view()),
    path("marks/<int:pk>/", MarksDeatailView.as_view()),
]