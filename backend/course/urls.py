from django.urls import path
from course.views import CourseDetailView, CoursesListCreateView

urlpatterns = [
    path('', CoursesListCreateView.as_view()),
    path('<int:pk>/', CourseDetailView.as_view()),
]