import { useState } from "react";
import { useAuth } from "../provider/authProvider";
import Loader from "../components/Loader";

const Login = () => {
  const { onLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    let errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onLogin(setLoading, email, password);
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
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Login
          </button>
        </div>
        {loading ? <Loader /> : null}
      </form>
    </div>
  );
};

export default Login;
