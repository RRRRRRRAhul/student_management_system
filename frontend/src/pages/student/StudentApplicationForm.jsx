import StudentForm from "../../components/student/ApplicationForm";
import { getCourses } from "../../features/courses/courseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCourses } from "../../features/courses/courseSelector";
import { createApplication } from "../../features/applications/applicationApi";
import { selectAuthUser } from "../../features/auth/authSelector";

const StudentApplication = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const user = useSelector(selectAuthUser);
  const student_id = user?.student_id;
  console.log(student_id);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleSubmit = async (full_name, course) => {
    const payload = {
      full_name,
      course,
    };

    await dispatch(createApplication(payload));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-start pt-10">
      <div className="w-full max-w-xl">
        {!student_id && (
          <StudentForm courses={courses} handleSubmit={handleSubmit} />
        )}
        {student_id && (
          <div className="bg-white w-full max-w-lg mx-auto rounded-2xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                ✓
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Application Submitted
            </h2>

            <p className="text-gray-600 text-sm">
              You already have a student profile. If not our team is reviewing your
              application, Thank you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentApplication;
