const StudentWelcomeCard = ({student}) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold">Welcome, {student?.name}</h2>
    <p className="text-gray-500">Here’s your academic overview</p>
  </div>
);

export default StudentWelcomeCard;
