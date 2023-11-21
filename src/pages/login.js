import React, { useState } from "react";
import logincard from "../pages/login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/action";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successfullylogin, setSuccessfullylogin] = useState(true);
  const [errorlogin, setErrorlogin] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const apierror = useSelector((state) => state.auth.error);
  console.log('apierror: ', apierror);

  const navigate = useNavigate();
  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@cindral\.com/.test(email)) {
      errors.email = "Email is invalid";
    } else {
      errors.email = "";
    }

    if (!username) {
      errors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) {
      errors.username = "Username must be 4 characters";
    } else {
      errors.username = "";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else {
      errors.password = "";
    }

    setErrors(errors);

    const isValid = Object.values(errors).every((error) => error === "");
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid. Submitting...");
      dispatch(loginUser(email, password, username, navigate));
    } else {
      console.log("Form is invalid. Please check the errors.");
    }
  };

  return (
    <div className="App">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="error">{errors.username}</span>
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error">{errors.email}</span>
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error">{errors.password}</span>
          </label>
          <span style={{ color: "red" }}>{apierror.toLowerCase()}</span>
          <button type="submit" style={{ marginTop: 10 }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
