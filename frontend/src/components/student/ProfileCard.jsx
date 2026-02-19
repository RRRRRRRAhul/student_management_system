import DefaultAvatar from "./DefaultAvatar";
import { getCourseById } from "../../features/courses/courseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleCourse } from "../../features/courses/courseSelector";

const ProfileCard = ({ student }) => {
  const course_id = student?.course;
  const dispatch = useDispatch();
  const course = useSelector(selectSingleCourse);
  useEffect(() => {
    if (course_id) {
      dispatch(getCourseById(course_id));
    }
  }, [dispatch, course_id]);

  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-6 items-center">
      <DefaultAvatar size={80} />

      <div>
        <h2 className="text-xl font-semibold">
          {student?.name || "Student Name"}
        </h2>
        <p className="text-gray-500">{student?.email || "email@example.com"}</p>
        <p className="text-sm text-gray-400 mt-1">
          Course: {course?.name || student?.course || "Not Assigned"}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
