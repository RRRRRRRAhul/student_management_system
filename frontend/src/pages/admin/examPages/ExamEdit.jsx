import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../features/exams/examApi";
import { getSubjects } from "../../../features/subjects/subjectApi";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedExam } from "../../../features/exams/examSelector";
import { selectSubjects } from "../../../features/subjects/subjectSelector";
import { updateExam } from "../../../features/exams/examApi";

/* backend choices */
const EXAM_TYPES = [
  { value: "midterm", label: "Mid Term" },
  { value: "final", label: "Final" },
  { value: "internal", label: "Internal" },
];

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exam = useSelector(selectSelectedExam);
  const subjects = useSelector(selectSubjects);
  console.log(exam);

  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    exam_type: "",
    max_marks: "",
    exam_date: "",
  });

  useEffect(() => {
    dispatch(getExamById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (exam) {
      setFormData({
        subject: exam.subject_name,
        name: exam.name,
        exam_type: exam.exam_type,
        max_marks: exam.max_marks,
        exam_date: exam.exam_date,
      });
    }
  }, [exam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(updateExam(id, formData));

    if (result.success) {
      navigate("/admin/exam-list");
    } else {
      alert("Sorry there is a problem in updating!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Exam</h1>
        <button
          onClick={() => navigate("/admin/exam-list")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Exam List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Exam Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Type <span className="text-red-500">*</span>
          </label>
          <select
            name="exam_type"
            value={formData.exam_type}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select exam type</option>
            {EXAM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Max Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Marks <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="max_marks"
            value={formData.max_marks}
            onChange={handleChange}
            required
            min="1"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Exam Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions (same as Subject Edit) */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="
              px-4 py-2
              bg-blue-600 text-white
              rounded
              hover:bg-blue-700
              transition
            "
          >
            Update Exam
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/exam-list")}
            className="
              px-4 py-2
              bg-gray-200 text-gray-700
              rounded
              hover:bg-gray-300
              transition
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExam;
