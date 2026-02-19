import StudentForm from "../../components/admin/StudentForm";
import { useSelector } from "react-redux";
import { selectStudents } from "../../features/students/studentSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStudents, updateStudent } from "../../features/students/studentApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../features/courses/courseApi";
import { selectCourses } from "../../features/courses/courseSelector";

const EditStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const students = useSelector(selectStudents);
  const currentStudent = students.find((s) => s.id === parseInt(id));
  const courses = useSelector(selectCourses);

  useEffect(() => {
    if(!students.length){
      dispatch(getStudents());
    }
    if(!courses.length){
      dispatch(getCourses());
    }
  }, [dispatch, students.length, courses.length]);

  const handleSubmit = async (updatedStudent) => {
  await dispatch(
    updateStudent({
      id: parseInt(id),
      studentInfo: updatedStudent,
    })
  );

  navigate("/admin/students");
};


  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Edit Student</h1>
      <StudentForm defaultValues={currentStudent} handleSubmit={handleSubmit} courses={courses} />
    </>
  );
};

export default EditStudent;
