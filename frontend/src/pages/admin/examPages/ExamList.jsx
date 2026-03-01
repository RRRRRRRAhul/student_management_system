import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../../../components/admin/ConfirmDeleteModal";
import { getExams } from "../../../features/exams/examApi";
import { selectExams } from "../../../features/exams/examSelector";
import { useDispatch, useSelector } from "react-redux";
import { updateExam } from "../../../features/exams/examApi";
import { deleteExam } from "../../../features/exams/examApi";

const ExamList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const exams = useSelector(selectExams)

  useEffect(() => {
    dispatch(getExams())
  }, [dispatch])

  const handleEdit = (id) => {
    navigate(`/admin/exam-edit/${id}`);
  };

  const handleDelete = (exam) => {
    setSelectedExam(exam);
    setIsOpen(true);
  };

  const confirmDelete = async() => {
    const response = await dispatch(deleteExam(selectedExam.id))

    if(response.success){
      alert("Exam deleted successfully!")
      setIsOpen(false)
    }
    else{
      alert("Sorry, there is a problem!")
      setIsOpen(false)
    }
  };

  const handlePublishExam = async (id) => {
    const publishExam = {
      is_published : true
    }

    const response = await dispatch(updateExam(id, publishExam))

    if(response.success){
      alert("Exam is published successfully!")
    }
    else{
      alert("Sorry, there is a problem!")
    }
  }

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Exams</h1>
          <button
            onClick={() => navigate("/admin/exam-create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Exam
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Exam Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Exam Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Max Marks
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Publish Exam
                </th>
              </tr>
            </thead>

            <tbody>
              {exams.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500"
                  >
                    No exams found
                  </td>
                </tr>
              ) : (
                exams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{exam.name}</td>
                    <td className="px-4 py-3">{exam.subject_name}</td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        {exam.exam_type}
                      </span>
                    </td>

                    <td className="px-4 py-3">{exam.exam_date}</td>
                    <td className="px-4 py-3">{exam.max_marks}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          exam.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {exam.is_published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(exam.id)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exam)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>

                    <td className="px-4 py-3 text-center">
                    {exam.is_published ? (
                      <span
                        className="
                          inline-flex items-center
                          px-2.5 py-1
                          rounded-full
                          text-xs font-semibold
                          bg-green-100 text-green-700
                        "
                      >
                        Published
                      </span>
                    ) : (
                      <button
                        onClick={() =>handlePublishExam(exam.id)}
                        className="
                          px-3 py-1
                          text-xs font-semibold
                          rounded-full
                          bg-amber-100 text-amber-700
                          hover:bg-amber-200
                          transition
                          cursor-pointer
                        "
                      >
                        Publish It
                      </button>
                    )}
                  </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDeleteModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default ExamList;