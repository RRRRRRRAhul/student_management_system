import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectById } from "../../../features/subjects/subjectApi";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubject } from "../../../features/subjects/subjectSelector";
import { updateSubject } from "../../../features/subjects/subjectApi";

const EditSubject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const subject = useSelector(selectSelectedSubject);

  const [formData, setFormData] = useState({
    name: "",
    course_name: "",
    is_active: true,
  });

  useEffect(() => {
    dispatch(getSubjectById(id));
  }, [id]);

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        course_name: subject.course_name,
        is_active: subject.is_active,
      });
    }
  }, [subject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(updateSubject(id, formData));

    if (result.success) {
      navigate("/admin/subject-list");
    } else {
      alert("Sorry there is a problem in updating!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Subject
        </h1>
        <button
          onClick={() => navigate("/admin/subject-list")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Subject List
        </button>
      </div>

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
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-700">Active Subject</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/subject-list")}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubject;
