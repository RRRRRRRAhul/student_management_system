import StudentRow from "./StudentRow";

const StudentTable = ({ students, handleEdit, handleDelete, courses }) => (
  <table className="w-full bg-white rounded-xl shadow">
    <tbody>
      {students.map((s) => (
        <StudentRow key={s.id} student={s} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </tbody>
  </table>
);

export default StudentTable;
