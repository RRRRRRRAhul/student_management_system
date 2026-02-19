const CourseOverviewCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">My Course</h3>

      <p className="text-gray-700 font-medium">
        {course?.name || "No course assigned yet"}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Status: {course?.is_active ? "Active" : "Inactive"}
      </p>
    </div>
  );
};

export default CourseOverviewCard;