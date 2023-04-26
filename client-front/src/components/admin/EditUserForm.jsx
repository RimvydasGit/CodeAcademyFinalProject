import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import axios from "axios";
import { config } from "../../Constants.js";
import Camera14 from "../../assets/Camera14.jpg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditUserForm({ userId }) {
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const authProv = React.useMemo(() => new AuthProvider(), []);

  useEffect(() => {
    axios
      .get(`${config.url.API_BASE_URL}/api/v1/users/id/${userId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: orderApi.bearerAuth(authProv.getUser()),
        },
      })
      .then((response) => {
        setUser(response.data);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setRole(response.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, authProv]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(user.fullName)) {
      validationErrors.fullName =
        "Full name should only contain letters and spaces";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(user.email)
    ) {
      validationErrors.email = "Invalid email address";
    }
    if (role !== "USER" && role !== "ADMIN") {
      validationErrors.role = "Role is invalid";
    }
    if (
      !password ||
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/.test(
        password
      ) ||
      password.length < 8
    ) {
      validationErrors.password =
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace";
    }
    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(
          `${config.url.API_BASE_URL}/api/v1/users/id/${userId}`,
          {
            fullName,
            email,
            role,
            password,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: orderApi.bearerAuth(authProv.getUser()),
            },
          }
        )
        .then((response) => {
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
    <div className="min-h-screen flex justify-center items-center bg-cover bg-no-repeat">
      <div
        className="absolute w-full h-full bg-cover bg-no-repeat"
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
          Edit user's credencials
        </h1>
        <form className="max-w-md w-full p-8 z-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-gray-200"
              htmlFor="email"
            >
              Full name
            </label>
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              id="full-name"
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs italic">{errors.fullName}</p>
            )}
          </div>
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
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="current-username"
            />
            {errors.email && (
              <p className="text-red-400 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-gray-200"
              htmlFor="role"
            >
              Role
            </label>
            <div className="relative">
              <select
                className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                id="role"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs italic">{errors.role}</p>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.95 7.95a1 1 0 0 0-1.41 0L10 11.1 6.46 7.56a1 1 0 1 0-1.41 1.41l3.54 3.54a1 1 0 0 0 1.41 0l3.54-3.54a1 1 0 0 0 0-1.41z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-gray-200"
              htmlFor="password"
            >
              Temporary password for user
            </label>
            <input
              className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="w-full text-gray-200 text-center border border-blue-500 p-2 hover:bg-blue-500 rounded-lg px-4  hover:text-gray-700"
              onClick={handleSubmit}
            >
              Save
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
