const FilterButtonsApplication = ({ setStatusFilter, statusFilter }) => {
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
        All Applications
      </button>

      {/* APPROVED */}
      <button
        onClick={() => setStatusFilter("approved")}
        className={`${base} ${
          statusFilter === "approved"
            ? `bg-green-600 text-white ${active} ring-green-600`
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        ✅ Approved
      </button>

      {/* REJECTED */}
      <button
        onClick={() => setStatusFilter("rejected")}
        className={`${base} ${
          statusFilter === "rejected"
            ? `bg-red-600 text-white ${active} ring-red-600`
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        ❌ Rejected
      </button>

      {/* PENDING */}
      <button
        onClick={() => setStatusFilter("pending")}
        className={`${base} ${
          statusFilter === "pending"
            ? `bg-amber-500 text-white ${active} ring-amber-500`
            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
        }`}
      >
        ⏳ Pending
      </button>
    </div>
  );
};

export default FilterButtonsApplication;