import React, { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { orderApi } from "../services/OrderApi";
import { parseJwt, handleLogError } from "../utils/Helpers";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Camera15 from "../../assets/Camera15.jpg";

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/;

export default function RegisterForm() {
  const Auth = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!fullName) {
      errors.fullName = "Full name is required";
    } else if (!fullName.match(nameRegex)) {
      errors.fullName = "Please enter a valid name";
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (
    event,
    user,
    Auth,
    setIsLoggedIn,
    setIsError,
    setErrorMessage
  ) => {
    event.preventDefault();
    if (validateForm()) {
      orderApi
        .signup(user)
        .then((response) => {
          const { accessToken } = response.data;
          const data = parseJwt(accessToken);
          const user = { data, accessToken };

          Auth.userLogin(user);
          setIsLoggedIn(true);
          setErrorMessage("");
        })
        .catch((error) => {
          handleLogError(error);
          if (error.response && error.response.data) {
            setIsError(true);
            setErrorMessage(error.response.data.message);
          }
        });
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Camera15})` }}
    >
      <div className="max-w-md w-full bg-[#060f25] shadow-md rounded-lg py-8 px-8 z-10 mx-4 md:mx-0">
        <div className="flex-wrap justify-start mb-8 ">
          <NavLink to="/" className="text-blue-200 hover:text-blue-500">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          </NavLink>
        </div>
        <h1 className="text-3xl text-start mb-4 text-gray-200">
          Create a Moon <br></br> Account
        </h1>
        <h4 className="text-start mb-4 text-gray-500">
          We are excited to see you here!
        </h4>
        <form
          onSubmit={(event) =>
            handleSubmit(
              event,
              { fullName, email, password },
              Auth,
              setIsLoggedIn
            )
          }
        >
          <div className="mb-4">
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="fullName"
              placeholder="Full name"
              onChange={handleInputChange}
              value={fullName}
            />
            {formErrors.fullName && (
              <p className="text-red-400">{formErrors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleInputChange}
              autoComplete="username"
              value={email}
            />
            {formErrors.email && (
              <p className="text-red-400">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              autoComplete="current-password"
              value={password}
            />
            {formErrors.password && (
              <p className="text-red-400">{formErrors.password}</p>
            )}
          </div>
          <button
            className="w-full text-gray-200 text-center border border-blue-500 p-2 hover:bg-blue-500 rounded-lg px-4  hover:text-gray-700"
            type="submit"
          >
            Sign Up
          </button>
          {isLoggedIn && <Navigate to="/" />}
        </form>
        <p className="text-center text-gray-200 mt-4">
          Already have a Moon account?{" "}
          <NavLink to="/login" className="text-blue-200  hover:text-blue-500">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
