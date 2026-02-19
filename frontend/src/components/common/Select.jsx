const Select = ({ label, children, className = "", ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select
        {...props}
        className="
          w-full
          px-4 py-2.5
          border border-gray-300
          rounded-lg
          bg-white
          text-gray-700
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
