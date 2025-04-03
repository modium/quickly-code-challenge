import { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext({
  token: "",
  onLogin: () => {},
});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");

  const handleLogin = async (email, password) => {
    await fetch("https://api-dev.quicklyinc.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const token = json.token;
        setToken(token);
        const origin = location.state?.from?.pathname || "/profile";
        navigate(origin);
      })
      .catch((error) => {
        alert("Invalid credentials");
        console.error(error);
      });
  };

  const value = {
    token,
    onLogin: handleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
