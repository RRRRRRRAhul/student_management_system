import { forwardRef } from "react";

const Input = forwardRef(({ label, className = "", id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-600" htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
