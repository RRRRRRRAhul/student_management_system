import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../features/courses/courseApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCourses } from "../../../features/courses/courseSelector";
import { createSubject } from "../../../features/subjects/subjectApi";

const CreateSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    course: "",
    is_active: true,
  });

  console.log(courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.course) {
      setError("All fields are required");
      return;
    }

    setError(null);
    if (!error) {
      await dispatch(createSubject(formData));
      navigate("/admin/subject-list")
    } else {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Subject
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 space-y-5"
        >
          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter subject name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter subject name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Active</label>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Create Subject
            </button>
            <button
              type="button"
              className="border px-5 py-2 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/admin/subject-list")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubject;
