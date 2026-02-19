const DefaultImage = ({ className = "" }) => (
  <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
    <span className="text-gray-500 text-sm">No Image</span>
  </div>
);

export default DefaultImage;
