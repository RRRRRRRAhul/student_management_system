import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCourses, updateCourse } from "../../features/courses/courseApi";
import {
  selectCourses,
  selectCourseLoading,
} from "../../features/courses/courseSelector";

import FilterButtonsCourse from "../../components/admin/FilterButtonsCourse";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");

  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCourseLoading);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/admin/course-edit/${id}`);
  };

  const handleChangeStatus = async (course) => {
    const newStatus = !course.is_active;
    await dispatch(updateCourse(course.id, { is_active: newStatus }));
    dispatch(getCourses());
  };

  const filteredCourses = courses.filter((course) => {
    if (statusFilter === "active") return course.is_active;
    if (statusFilter === "inactive") return !course.is_active;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Courses</h1>

        {/* TOP ACTION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* LEFT CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="
                px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
                transition-all duration-200 shadow-md hover:shadow-xl
              "
              onClick={() => navigate("/admin/subject-list")}
            >
              See Subject List
            </button>

            <button
              className="
                px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
                transition-all duration-200 shadow-md
                bg-indigo-600 text-white hover:bg-indigo-700
              "
              onClick={() => navigate("/admin/exam-list")}
            >
              See Exam List
            </button>

            <button
              className="
                px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
                transition-all duration-200 shadow-md
                bg-green-600 text-white hover:bg-green-700
              "
              onClick={() => navigate("/admin/mark-list")}
            >
              See Marks List
            </button>
          </div>

          {/* RIGHT ADD BUTTON */}
          <button
            className="
              bg-blue-600 text-white px-5 py-2.5 rounded-full
              text-sm font-semibold shadow-md
              hover:bg-blue-700 transition
            "
            onClick={() => navigate("/admin/create-course")}
          >
            + Add Course
          </button>
        </div>
        <FilterButtonsCourse
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
        />

        {/* TABLE */}
        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Code</th>
                  <th className="text-left px-4 py-3">Duration (months)</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Created</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{course.name}</td>
                    <td className="px-4 py-3">{course.code}</td>
                    <td className="px-4 py-3">{course.duration}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          course.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(course.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 space-x-2">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => handleEdit(course.id)}
                      >
                        Edit
                      </button>

                      <button
                        className={`px-3 py-1 text-white rounded ${
                          course.is_active
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={() => handleChangeStatus(course)}
                      >
                        {course.is_active ? "Deactivate" : "Activate"}
                      </button>
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

export default CourseList;
