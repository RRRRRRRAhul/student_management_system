import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentList from "./pages/admin/StudentList";
import EditStudent from "./pages/admin/EditStudent";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ApplicationList from "./pages/admin/ApplicationList";
import StudentApplicationForm from "./pages/student/StudentApplicationForm";
import CourseCreate from "./pages/admin/CourseCreate";
import CourseList from "./pages/admin/courseList";
import EditCourse from "./pages/admin/EditCourse";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import { initializeAuth } from "./features/auth/authApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* default */}
        <Route index element={<Navigate to="/login" />} />

        {/* PUBLIC ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Student */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/application" element={<StudentApplicationForm />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentList />} />
            <Route path="/admin/applications" element={<ApplicationList />} />
            <Route path="/admin/edit-student/:id" element={<EditStudent />} />
            <Route path="/admin/create-course" element={<CourseCreate />} />
            <Route path="/admin/course-list" element={<CourseList />} />
            <Route path="/admin/course-edit/:id" element={<EditCourse/>}/>
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 | Page Not Found</h1>}
        />
      </Routes>
    </Router>
  );
};

export default App;
