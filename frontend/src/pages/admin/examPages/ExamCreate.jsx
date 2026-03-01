import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../features/subjects/subjectApi";
import { useDispatch, useSelector } from "react-redux";
import { selectSubjects } from "../../../features/subjects/subjectSelector";
import { createExam } from "../../../features/exams/examApi";

const examTypes = [
  { value: "midterm", label: "Mid Term" },
  { value: "final", label: "Final" },
  { value: "internal", label: "Internal" },
];

const CreateExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subjects = useSelector(selectSubjects)

  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    exam_type: "",
    max_marks: "",
    exam_date: "",
    is_published: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getSubjects())
  },[dispatch])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.subject ||
      !formData.name ||
      !formData.exam_type ||
      !formData.max_marks ||
      !formData.exam_date
    ) {
      setError("All fields are required");
      return;
    }

    setError(null);

    await dispatch(createExam(formData));
    navigate("/admin/exam-list");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Exam
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 space-y-5"
        >
          {/* Exam Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. DSA Mid Semester Exam"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <select
            name="exam_type"
            value={formData.exam_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select exam type</option>
            {examTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Max Marks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Marks
            </label>
            <input
              type="number"
              name="max_marks"
              value={formData.max_marks}
              onChange={handleChange}
              placeholder="e.g. 100"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Exam Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Date
            </label>
            <input
              type="date"
              name="exam_date"
              value={formData.exam_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Publish */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Publish Exam</label>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
            >
              Create Exam
            </button>
            <button
              type="button"
              className="border px-5 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/admin/exam-list")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
