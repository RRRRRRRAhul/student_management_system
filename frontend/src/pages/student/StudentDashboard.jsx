import StudentWelcomeCard from "../../components/student/StudentWelcomeCard";
import CourseOverviewCard from "../../components/student/CourseOverviewCard";
import { selectAuthUser } from "../../features/auth/authSelector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStudentById } from "../../features/students/studentApi";
import { selectStudent } from "../../features/students/studentSelector";
import { useDispatch } from "react-redux";
import { getCourseById } from "../../features/courses/courseApi";
import { selectSingleCourse } from "../../features/courses/courseSelector";
import { selectAuthLoading } from "../../features/auth/authSelector";
import Loader from "../../components/common/Loader";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const authLoading = useSelector(selectAuthLoading);
  const student_id = user?.student_id;
  const student = useSelector(selectStudent);
  const course = useSelector(selectSingleCourse);

  useEffect(() => {
    if (student_id) {
      dispatch(getStudentById(student_id));
    }
  }, [dispatch, student_id]);

  useEffect(() => {
    if (student?.course && !course) {
      dispatch(getCourseById(student.course));
    }
  }, [dispatch, student?.course, course]);

  console.log({
    authLoading,
    user,
    student_id,
    student,
  });

  return (
    <>
      {/* Auth still loading */}
      {authLoading && (
        <div className="bg-blue-50 border border-blue-300 p-4 rounded">
          <p className="text-blue-700">Loading your dashboard...</p>
          <Loader />
        </div>
      )}

      {/* Auth loaded but no student ID */}
      {!authLoading && !student_id && !student && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
          <p className="text-yellow-700">
            Your admission is under review or you have not been assigned a
            student ID yet.
          </p>
        </div>
      )}

      {/* Student data loading */}
      {student_id && !student && (
        <div className="bg-blue-50 border border-blue-300 p-4 rounded">
          <p className="text-blue-700">Loading your dashboard...</p>
          <Loader />
        </div>
      )}

      {/* Everything ready */}
      {student_id && student && (
        <div className="space-y-6">
          <StudentWelcomeCard student={student} />
          <CourseOverviewCard course={course} />
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
