const StudentRow = ({ student, handleEdit, handleDelete }) => (
  <tr className="border-b">
    <td className="p-2">{student.name}</td>
    <td className="p-2">{student.email || "No email"}</td>
    
    <td className="p-2 text-center">
      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleEdit(student)}>
        Edit
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 ml-2" onClick={() => handleDelete(student)}>
        Delete
      </button>
    </td>
  </tr>
);

export default StudentRow;
