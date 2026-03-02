import { useSelector, useDispatch } from "react-redux";
import { examsByStudent } from "../../../features/exams/examApi";
import { selectExams } from "../../../features/exams/examSelector";
import { useEffect } from "react";

const StudentExamsList = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectExams);

  useEffect(() => {
    dispatch(examsByStudent());
  }, [dispatch]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Exams</h1>
        <p className="text-sm text-gray-500">
          View exams assigned to your subjects
        </p>
      </div>

      {/* Exam List */}
      <div className="grid gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {exam.name}
                </h2>
                <p className="text-sm text-gray-500">Subject: {exam.subject_name}</p>
              </div>

              {/* Published Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  exam.is_published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {exam.is_published ? "Published" : "Not Published"}
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Exam Type:</span> {exam.exam_type}
              </div>
              <div>
                <span className="font-medium">Max Marks:</span> {exam.max_marks}
              </div>
              <div>
                <span className="font-medium">Exam Date:</span> {exam.exam_date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExamsList;
