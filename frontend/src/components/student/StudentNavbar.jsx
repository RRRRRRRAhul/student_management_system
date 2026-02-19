import MainNavbar from "../common/MainNavbar";
import { logoutUser } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const StudentNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.pathname.split("/").pop();
  const currentPage = keyword?.toLowerCase();

  const links = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Profile", to: "/student/profile" },
    { label: "Application", to: "/student/application" },
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
  });

  return <MainNavbar links={fileteredLinks} />;
};

export default StudentNavbar;
