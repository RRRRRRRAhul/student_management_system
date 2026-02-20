import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../features/courses/courseApi";
import {
  selectCourses,
  selectCourseLoading,
} from "../../features/courses/courseSelector";
import { useNavigate } from "react-router-dom";
import { updateCourse } from "../../features/courses/courseApi";
import FilterButtonsCourse from "../../components/admin/FilterButtonsCourse";


const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all")
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
    if(statusFilter == "active"){
      return course.is_active;
    }
    else if(statusFilter == "inactive"){
      return !course.is_active;
    }
    else{
      return true
    }
  })

  console.log(courses)
  console.log(filteredCourses)

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
        <FilterButtonsCourse setStatusFilter={setStatusFilter} statusFilter={statusFilter}/>

        {filteredCourses?.length === 0 ? (
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
                            ? "bg-green-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(course.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                        onClick={() => {
                          handleEdit(course.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`px-3 py-1 text-white rounded cursor-pointer mx-1 ${
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
