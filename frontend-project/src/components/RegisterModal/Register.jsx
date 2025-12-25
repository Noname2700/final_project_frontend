import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import "./styles/Register.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <Logo title={""} />
      <p className="register__welcome">Please register.</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Sign up
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Already a member?</p>
        <Link to="login" className="register__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
