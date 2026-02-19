from django.urls import path
from student.views import StudentDetailView, StudentsListCreateView, StudentApplicationReadCreateView, StudentApplicationApproveView

urlpatterns = [
    path('', StudentsListCreateView.as_view()),
    path('<int:pk>/', StudentDetailView.as_view()),
    path('applications/', StudentApplicationReadCreateView.as_view()),
    path('applications/<int:pk>/approve/', StudentApplicationApproveView.as_view()),
]
