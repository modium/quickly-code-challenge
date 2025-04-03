import { useState } from "react";
import { useAuth } from "../provider/authProvider";
import Loader from "../components/Loader";

const Login = () => {
  const { onLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    let errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      onLogin(email, password);
    }
  };

  const validate = () => {
    const error = {};

    if (email === "") {
      error.email = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      error.email = "Email must be valid";
    } else {
      delete error.email;
    }

    if (password === "") {
      error.password = "Please enter password";
    } else if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    } else {
      delete error.password;
    }

    return error;
  };

  return (
    <div>
      <h1>Login</h1>
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;
