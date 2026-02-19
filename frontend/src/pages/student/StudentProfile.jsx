import ProfileCard from "../../components/student/ProfileCard";
import { useSelector } from "react-redux";
import { selectStudent } from "../../features/students/studentSelector";
import { selectAuthUser } from "../../features/auth/authSelector";
import { getStudentById } from "../../features/students/studentApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/common/Loader";

const StudentProfile = () => {
  const student = useSelector(selectStudent);
  const user = useSelector(selectAuthUser);
  const student_id = user?.student_id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (student_id) {
      dispatch(getStudentById(student_id));
    }
  }, [dispatch, student_id]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {!student_id && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
          <p className="text-yellow-700">
            Your admission is under review or you have not been assigned a
            student ID yet. Please contact the administration for more
            information.
          </p>
        </div>
      )}
      {student_id && !student && (
        <div className="bg-blue-50 border border-blue-300 p-4 rounded">
          <Loader />
        </div>
      )}
      {student_id && student && <ProfileCard student={student} />}
    </>
  );
};

export default StudentProfile;
