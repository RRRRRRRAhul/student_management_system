const DefaultAvatar = ({ size = 64 }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold"
      style={{ width: size, height: size }}
    >
      U
    </div>
  );
};

export default DefaultAvatar;
