const FilterButtonsSubject = ({ setStatusFilter, statusFilter }) => {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const active =
    "scale-105 shadow-md ring-2 ring-offset-1";

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* ALL */}
      <button
        onClick={() => setStatusFilter("all")}
        className={`${base} ${
          statusFilter === "all"
            ? `bg-gray-800 text-white ${active} ring-gray-800`
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Subjects
      </button>

      {/* ACTIVE */}
      <button
        onClick={() => setStatusFilter("active")}
        className={`${base} ${
          statusFilter === "active"
            ? `bg-green-600 text-white ${active} ring-green-600`
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        ✅ Active
      </button>

      {/* INACTIVE */}
      <button
        onClick={() => setStatusFilter("inactive")}
        className={`${base} ${
          statusFilter === "inactive"
            ? `bg-red-600 text-white ${active} ring-red-600`
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        ❌ Inactive
      </button>
    </div>
  );
};

export default FilterButtonsSubject;