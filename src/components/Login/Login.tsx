import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { ApiContext } from "../../context/ApiContext";
// import { PassengerContext } from "../../../contexts/PassengerContext";
// import Navbar from "../../../components/nav/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(ApiContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.email) {
      setError((data) => ({
        ...data,
        email: "Du behöver ange en e-postadress",
      }));
      hasError = true;
    }

    if (!formData.password) {
      setError((data) => ({
        ...data,
        password: "Du behöver ange ett lösenord",
      }));
      hasError = true;
    }

    if (hasError) return;

    try {
      // clearErrorMessagePassenger();
      const response = await loginUser(formData.email, formData.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="login-form-text">Logga in till ditt konto här:</p>
        <div className="login-form-group">
          <label className="login-form-labels" htmlFor="email">
            E-post*
          </label>
          <p className="login-red-text">
            <Link
              className="login-error-text"
              to={"/passengerregister"}
              style={{ color: "red" }}
            >
              Skaffa konto här
            </Link>
          </p>
          <p className="login-red-text">
            <Link
              className="login-error-text"
              to={"/passengerforgotpassword"}
              style={{ color: "red" }}
            >
              Glömt lösenord?
            </Link>
          </p>
          <input
            type="email"
            name="email"
            className="login-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="login-error-text">{error.email}</p>
        </div>
        <div className="login-form-group">
          <label className="login-form-labels" htmlFor="password">
            Lösenord*
          </label>
          <input
            type="password"
            name="password"
            className="login-input"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="login-error-text">{error.password}</p>
        </div>
        <button id="login-btn" className="login-btn btn-primary" type="submit">
          Logga in
        </button>
        {/* {errorMessagePassenger && (
          <p className="PassengerLogin-error-message">
            {errorMessagePassenger}
          </p> */}
        {/* )} */}
      </form>
    </div>
  );
};

export default Login;
