import { Outlet, useLocation } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <StudentNavbar />}
      <main className="min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
