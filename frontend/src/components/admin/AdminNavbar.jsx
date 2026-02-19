import MainNavbar from "../common/MainNavbar";
import { logoutUser } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();
  const keyword = location.pathname.split("/").pop();
  const currentPage = keyword?.toLowerCase();

  const links = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Students", to: "/admin/students" },
    { label: "Applications", to: "/admin/applications" },
    { label: "Create Course", to: "/admin/create-course" },
    { label: "Courses", to: "/admin/course-list" },
    {
      label: "Logout",
      to: "/login",
      onClick: () => {
        dispatch(logoutUser());
        navigate("/login");
      },
    },
  ];

  const fileteredLinks = links.filter((link) => {
    return !link.to.endsWith(`/${currentPage}`);
  })

  return <MainNavbar links={fileteredLinks} />;
};

export default AdminNavbar;
