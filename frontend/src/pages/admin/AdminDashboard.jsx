import StatsCard from "../../components/admin/StatsCard";
import { selectApplications } from "../../features/applications/applicationSelector";
import { selectCourses } from "../../features/courses/courseSelector";
import { selectStudents } from "../../features/students/studentSelector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../features/courses/courseApi";
import {getApplications} from "../../features/applications/applicationApi";
import { getStudents } from "../../features/students/studentApi";



const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getApplications());
    dispatch(getStudents());
  }, [dispatch]);

  const applications = useSelector(selectApplications);
  const courses = useSelector(selectCourses);
  const students = useSelector(selectStudents);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="Total Students" value={students.length} />
      <StatsCard title="Active Students" value={students.filter(s => s.status === "active").length} />
      <StatsCard title="Courses" value={courses.length} />
      <StatsCard title="Applications" value={applications.length} />
    </div>
  );
};

export default AdminDashboard;
