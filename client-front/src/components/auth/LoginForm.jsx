import { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Message } from "semantic-ui-react";
import { orderApi } from "../services/OrderApi";
import { parseJwt, handleLogError } from "../utils/Helpers";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Camera15 from "../../assets/Camera15.jpg";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const Auth = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!email.match(emailRegex)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!password.match(passwordRegex) || password.length < 8) {
      errors.password =
        "Password must contain at least 8 characters with at least one letter and one digit";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      orderApi
        .authenticate(email, password)
        .then((response) => {
          const { accessToken } = response.data;
          const data = parseJwt(accessToken);
          const user = { data, accessToken };
          Auth.userLogin(user);
          setIsLoggedIn(true);
          setIsError(false);
        })
        .catch((error) => {
          handleLogError(error);
          setIsError(true);
          console.error(error);
        });
    }
  };

  if (isLoggedIn) {
    const userRole = Auth.user.data.role[0];
    if (userRole === "USER") {
      return <Navigate to="/user" />;
    } else if (userRole === "ADMIN") {
      return <Navigate to="/admin" />;
    } else {
      //Possible errors
    }
  } else {
    return (
      <div
        className="min-h-screen flex justify-center items-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${Camera15})` }}
      >
        <div className="max-w-md w-full bg-[#060f25] shadow-md rounded-lg py-8 px-8 mx-4 md:mx-0">
          <div className="flex-wrap justify-start mb-4">
            <NavLink to="/" className="text-blue-200 hover:text-blue-500">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            </NavLink>
          </div>
          <h1 className="text-3xl text-start mb-4 text-gray-200">
            Welcome<br></br> Back
          </h1>
          <h4 className="text-start mb-4 text-gray-500">
            Sign In to your Moon account
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleUsernameChange}
                autoComplete="username"
                placeholder="Email address"
                className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              />
              {formErrors.email && (
                <p className="text-red-400">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                autoComplete="current-password"
                className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              />
              {formErrors.password && (
                <p className="text-red-400">{formErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-gray-200 text-center border border-blue-500 p-2 hover:bg-blue-500 rounded-lg px-4  hover:text-gray-700"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-200 mt-4">
            New to Moon?{" "}
            <NavLink to="/signup" className="text-blue-200 hover:text-blue-500">
              Sign Up
            </NavLink>
          </p>
          {isError && (
            <Message negative className="text-red-400">
              The email or password provided are incorrect!
            </Message>
          )}
        </div>
      </div>
    );
  }
}
