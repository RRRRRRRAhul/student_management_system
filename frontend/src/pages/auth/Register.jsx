import RegisterForm from "../../components/auth/RegisterForm";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  selectAuthUser,
} from "../../features/auth/authSelector";
import { registerUser } from "../../features/auth/authApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Register = () => {
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
      } else {
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

    dispatch(registerUser(userInfo));
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Register Yourself
      </h2>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <RegisterForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <p className="mt-5">
        Already a registerd user?
        <Link className="px-1 font-bold" to={"/login"}>
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
