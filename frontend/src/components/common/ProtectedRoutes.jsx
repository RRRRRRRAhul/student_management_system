import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "../features/auth/authSelector";


const ProtectedRoute = () => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
const isAuthenticated = true; // Replace with actual authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
