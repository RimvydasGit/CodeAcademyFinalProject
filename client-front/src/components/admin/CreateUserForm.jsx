import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../Constants.js";
import { AuthProvider } from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import Camera14 from "../../assets/Camera14.jpg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CreateUserForm = () => {
  const authProv = new AuthProvider();

  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!user.email) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(user.email)
    ) {
      validationErrors.email = "Invalid email address";
    }
    if (!user.fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(user.fullName)) {
      validationErrors.fullName =
        "Full name should only contain letters and spaces";
    }
    if (!user.password) {
      validationErrors.password = "Password is required";
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/.test(
        user.password
      ) ||
      user.password.length < 8
    ) {
      validationErrors.password =
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace";
    }
    if (user.role !== "USER" && user.role !== "ADMIN") {
      validationErrors.role = "Role is invalid";
    }
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${config.url.API_BASE_URL}/api/v1/users`, user, {
          headers: {
            "Content-type": "application/json",
            Authorization: orderApi.bearerAuth(authProv.getUser()),
          },
        })
        .then((response) => {
          setUser({
            email: "",
            fullName: "",
            password: "",
            role: "",
          });
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center bg-cover bg-no-repeat">
      <div
        className="absolute w-screen h-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${Camera14})` }}
      ></div>
      <div className="max-w-md w-full bg-[#060f25] shadow-md rounded-lg py-8 px-8 z-10">
        <div className="flex-wrap justify-start mb-4 ">
          <NavLink to="/admin" className="text-blue-200 hover:text-blue-500">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </NavLink>
        </div>
        <h1 className="text-3xl text-center mb-4 text-gray-200">
          Create a new user
        </h1>
        <form className="max-w-md w-full p-8 z-10">
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-gray-200"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              autoComplete="username"
              placeholder="Email address"
              value={user.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="fullName"
            >
              Full name
            </label>
            <input
              className="appearance-none border rounded w-full text-sm py-2 px-3 bg-[#060f25] text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              placeholder="Full name"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs italic">{errors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="password"
            >
              Temporary password for user
            </label>
            <input
              className="appearance-none text-sm border rounded w-full bg-[#060f25] py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-400 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="appearance-none text-sm border rounded w-full bg-[#060f25] py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-xs italic">{errors.role}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Link
              className="w-full text-gray-200 text-center border border-blue-500 p-2 hover:bg-blue-500 rounded-lg px-4  hover:text-gray-700"
              onClick={handleSubmit}
            >
              Create a new user
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
