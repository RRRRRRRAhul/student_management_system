import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectSubjects } from "../../../features/subjects/subjectSelector";
import { subjectsByStudent } from "../../../features/subjects/subjectApi";

const StudentSubjectsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjects = useSelector(selectSubjects);

  useEffect(() => {
    dispatch(subjectsByStudent());
  }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Subjects
          </h1>

         <div className="flex justify-center items-center">
            <button
            onClick={() => navigate("/student/exams")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            View Exams
          </button>
          <button
            onClick={() => navigate("/student/marks")}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition ml-2 cursor-pointer"
          >
            View Marks
          </button>
          </div>
          
        </div>

        {subjects.length === 0 ? (
          <p className="text-gray-500">No subjects found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Subject Name</th>
                  <th className="text-left px-4 py-3">Subject Code</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {subject.name}
                    </td>
                    <td className="px-4 py-3">
                      {subject.code}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        Assigned
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubjectsList;