const StatsCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <h1 className="text-gray-500">{title}</h1>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatsCard;
