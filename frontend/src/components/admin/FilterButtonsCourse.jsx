const FilterButtonsCourse = ({ setStatusFilter, statusFilter }) => {
  const baseBtn =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const isActive = (value) => statusFilter === value;

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* ALL */}
      <button
        onClick={() => setStatusFilter("all")}
        className={`${baseBtn} ${
          isActive("all")
            ? "bg-gray-800 text-white ring-gray-800"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Courses
      </button>

      {/* ACTIVE */}
      <button
        onClick={() => setStatusFilter("active")}
        className={`${baseBtn} ${
          isActive("active")
            ? "bg-green-600 text-white ring-green-500"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        Active
      </button>

      {/* INACTIVE */}
      <button
        onClick={() => setStatusFilter("inactive")}
        className={`${baseBtn} ${
          isActive("inactive")
            ? "bg-red-600 text-white ring-red-500"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        Inactive
      </button>
    </div>
  );
};

export default FilterButtonsCourse;