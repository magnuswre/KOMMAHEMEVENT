import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext();
const BASE_URL = "http://localhost:3004";
const BASE_URL_TWO = "http://localhost:3005";

const ApiContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const registerUser = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, formData);
      setUser(response.data);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL_TWO}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate(`/dashboard/${data.user.id}`);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // EVENTS

  const value = {
    user,
    error,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiContextProvider;
