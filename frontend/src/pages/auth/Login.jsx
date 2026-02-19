import LoginForm from "../../components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  selectAuthUser,
} from "../../features/auth/authSelector";
import { useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authApi";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
      else {
        navigate("/student/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    dispatch(loginUser(userInfo));
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <p className="mt-5">Not a registerd user?<Link className="px-1 font-bold" to={"/register"}>Register</Link></p>
    </>
  );
};

export default Login;
