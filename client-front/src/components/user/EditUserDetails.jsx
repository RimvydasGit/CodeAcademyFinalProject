import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthProvider } from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../Constants.js";
import Camera10 from "../../assets/Camera10.jpg";
import Validate from "./Validate";

function EditUserForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordConfirmed, setOldPasswordConfirmed] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const authProv = new AuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const authProv = new AuthProvider();
    setFullName(authProv.getUserFullName());
    setEmail(authProv.getUserEmail());
    setRole(authProv.getUserRole());
  }, []);

  useEffect(() => {
    if (newPassword === "" && confirmNewPassword === "") {
      setPassword(oldPassword);
    } else if (newPassword === confirmNewPassword) {
      setPassword(newPassword);
    }
  }, [newPassword, confirmNewPassword, oldPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(newPassword === confirmNewPassword)) {
      alert("New passwords do not match");
      return;
    }
    if (
      authProv.getUserEmail() === email &&
      authProv.getUserFullName() === fullName &&
      newPassword === "" &&
      confirmNewPassword === ""
    ) {
      alert("There were no changes");
      return;
    }
    if (Validate(fullName, email, password, setFormErrors)) {
      axios
        .put(
          `${config.url.API_BASE_URL}/api/v1/users/me`,
          {
            fullName,
            email,
            role,
            password,
          },
          {
            headers: { Authorization: orderApi.bearerAuth(authProv.getUser()) },
          }
        )
        .then((response) => {
          authProv.userLogout();
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred. Please try again.");
        });
    }
  };

  const CheckAuthentication = async (email, password) => {
    if (Validate(fullName, email, password, setFormErrors)) {
      try {
        const response = await orderApi.authenticate(email, password);
        const { accessToken } = response.data;
        return accessToken ? true : false;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  };

  const handleConfirmOldPassword = async () => {
    const isOldPasswordConfirmed = await CheckAuthentication(
      email,
      oldPassword
    );
    setOldPasswordConfirmed(isOldPasswordConfirmed);
    console.log("oldPasswordConfirmed: ", oldPasswordConfirmed);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setShowConfirmNewPassword(true);
  };

  return (
    <>
      {!oldPasswordConfirmed ? (
        <div className="flex h-screen body">
          <img
            src={Camera10}
            className="lg:w-1/2 md:w-0 bg-cover bg-center"
            alt=""
          />
          <div className="flex ml-auto mb-auto mr-auto mt-auto body">
            <form className="place-content-center">
              <div>
                <label className="block text-gray-200 mb-2 font-bold text-xl ">
                  Hi, {fullName}!
                </label>
                <label className="block text-gray-200 mb-2">
                  Renew your profile information in 2 steps.
                </label>
                <br></br>
                <label className="block text-gray-200 mb-2">
                  Enter current password:
                </label>
                <input
                  className="bg-[#060f25] w-full shadow appearance-none text-sm border rounded py-2 px-3 mb-4 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={oldPasswordConfirmed}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={oldPassword}
                  onChange={(event) => {
                    setOldPassword(event.target.value);
                  }}
                />
                {formErrors.password && (
                  <p className="text-red-400">{formErrors.password}</p>
                )}
                <div className="flex justify-end mb-4 text-center">
                  <Link
                    className="w-full text-gray-200 p-2 border border-blue-500 hover:bg-blue-500 rounded-lg px-4  hover:text-black"
                    disabled={oldPasswordConfirmed}
                    onClick={handleConfirmOldPassword}
                  >
                    OK
                  </Link>
                </div>
                <div className="flex justify-end mb-4">
                  <Link
                    to="/user"
                    className="text-blue-200 hover:text-blue-500"
                  >
                    <span aria-hidden="true">← </span>
                    Back
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex h-screen body text-gray-200">
          <img
            src={Camera10}
            className="lg:w-1/2 md:w-0 responsive bg-cover bg-center"
            alt=""
          />
          <div className="flex ml-auto mb-auto mr-auto mt-auto body">
            <form className="place-content-center" onSubmit={handleSubmit}>
              <label className="block text-gray-200 mb-2">
                Edit your credentials to renew your profile information.
                <br></br> Follow the steps to update your details.
              </label>
              <br></br>
              <label className="block text-gray-200 mb-2">Full name</label>
              <input
                className="bg-[#060f25] w-full shadow appearance-none text-sm border rounded py-2 px-3 mb-4 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                disabled={!oldPasswordConfirmed}
              />
              {formErrors.fullName && (
                <p className="text-red-400">{formErrors.fullName}</p>
              )}

              <label className="block text-gray-200 mb-2">Email address</label>
              <input
                className="bg-[#060f25] w-full shadow appearance-none text-sm border rounded py-2 px-3 mb-4 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={!oldPasswordConfirmed}
              />
              {formErrors.email && (
                <p className="text-red-400">{formErrors.email}</p>
              )}

              <label className="block text-gray-200 mb-2">New password</label>
              <input
                className="bg-[#060f25] w-full shadow appearance-none text-sm border rounded py-2 px-3 mb-4 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                autoComplete="new-password"
                placeholder="<Optional>"
                value={newPassword}
                onChange={handleNewPasswordChange}
                disabled={!oldPasswordConfirmed}
              />
              {formErrors.password && (
                <p className="text-red-400">{formErrors.password}</p>
              )}

              {showConfirmNewPassword && (
                <>
                  <label className="block text-gray-200 mb-2">
                    Confirm new password
                  </label>
                  <input
                    className="bg-[#060f25] w-full shadow appearance-none text-sm border rounded py-2 px-3 mb-4 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    autoComplete="new-password"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                    disabled={!oldPasswordConfirmed}
                  />
                  {formErrors.password && (
                    <p className="text-red-400">{formErrors.password}</p>
                  )}
                </>
              )}

              <button
                className="w-full text-gray-200 p-2 border border-blue-500 hover:bg-blue-500 rounded-lg px-4  hover:text-black"
                type="submit"
                disabled={!oldPasswordConfirmed}
              >
                Save
              </button>

              <div className="flex justify-end mb-4">
                <Link className="text-blue-200  hover:text-blue-500" to="/user">
                  <span aria-hidden="true">← </span>
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUserForm;
