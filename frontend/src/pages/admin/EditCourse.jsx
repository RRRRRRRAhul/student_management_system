import CourseUpdateForm from "../../components/admin/CourseUpdateForm";
import { useParams } from "react-router-dom";
import { selectSingleCourse } from "../../features/courses/courseSelector";
import { useDispatch } from "react-redux";
import { getCourseById } from "../../features/courses/courseApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateCourse } from "../../features/courses/courseApi";
import { useNavigate } from "react-router-dom";


const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector(selectSingleCourse);

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id));
    } else {
      alert(
        "Sorry, but there is a technical problem please connect your developer",
      );
    }
  }, [dispatch, id]);

  const handleSubmit = async (id, courseData) => {
    await dispatch(updateCourse(id, courseData));
    navigate("/admin/course-list");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Edit Course</h1>
      <CourseUpdateForm initialData={course} handleSubmit={handleSubmit} />
    </>
  );
};

export default EditCourse;
