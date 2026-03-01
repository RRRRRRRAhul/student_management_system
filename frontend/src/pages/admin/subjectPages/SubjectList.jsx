import { getSubjects } from "../../../features/subjects/subjectApi";
import { selectSubjects } from "../../../features/subjects/subjectSelector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../../../components/admin/ConfirmDeleteModal";
import { deleteSubject } from "../../../features/subjects/subjectApi";
import FilterButtonsSubject from "../../../components/admin/FilterButtonsSubject";

const SubjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjects = useSelector(selectSubjects);
  const [isOpen, setIsOpen] = useState(false);
  const [stateFilter, setStateFilter] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log("Delete the subject", id);
    navigate(`/admin/subject-edit/${id}`);
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    console.log(selectedSubject.id);
    await dispatch(deleteSubject(selectedSubject.id))
    setIsOpen(false)
  };

  const filteredSubjects = subjects.filter((subject) => {
    if(stateFilter === "active"){
      return subject.is_active;
    }
    else if(stateFilter === "inactive"){
      return !subject.is_active;
    }
    return true
  })

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              navigate("/admin/subject-create");
            }}
          >
            + Add Subject
          </button>
        </div>

        <FilterButtonsSubject
        statusFilter={stateFilter}
        setStatusFilter={setStateFilter}
        />

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No subjects found
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{subject.name}</td>
                    <td className="px-4 py-3">{subject.course_name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          subject.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subject.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{subject.created_at}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(subject.id)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(subject)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ConfirmDeleteModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            confirmDelete={confirmDelete}
          />
        </div>
      </div>
    </>
  );
};

export default SubjectList;
