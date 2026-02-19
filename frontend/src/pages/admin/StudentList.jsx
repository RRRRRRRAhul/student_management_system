import { use, useState } from "react";
import StudentTable from "../../components/admin/StudentTable";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import { useSelector } from "react-redux";
import { selectStudents } from "../../features/students/studentSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getStudents,
  deleteStudent,
} from "../../features/students/studentApi";
import {
  selectStudentLoading,
  selectStudentError,
} from "../../features/students/studentSelector";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

const StudentList = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(selectStudents);
  const loading = useSelector(selectStudentLoading);
  const error = useSelector(selectStudentError);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleEdit = (student) => {
    navigate(`/admin/edit-student/${student.id}`);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      dispatch(deleteStudent(selectedStudent.id));
      setOpen(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Students</h1>
      {loading && <Loader />}
      {error && <p className="text-red-500">Error: {error}</p>}

      {students && !loading && !error && (
        <StudentTable
          students={students}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}

      <ConfirmDeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default StudentList;
