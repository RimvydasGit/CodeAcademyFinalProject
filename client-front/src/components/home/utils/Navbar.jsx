import React from "react";
import WhiteMoon from "../../../assets/WhiteMoon.png";
import { AuthProvider } from "../../auth/AuthContext";
import { useState } from "react";
import { orderApi } from "../../services/OrderApi";
import ModalAboutUs from "./AboutUsModal";
import ModalAboutMoon from "./AboutMoonModal";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const authProv = new AuthProvider();
  const [isAdmin, setIsAdmin] = useState(true);
  try {
    orderApi.isAdmin().then((result) => {
      setIsAdmin(result);
    });
  } catch (error) {
    console.error(error);
  }
  let userRole;
  try {
    userRole = authProv.getUserRole();
  } catch (error) {
    userRole = "";
  }
  let linkString = "/login";
  let linkText = "Log in";
  let additionalLinkString = "";
  let additionalLinkText = "";

  if (!isAdmin) {
    linkString = "/signup";
    linkText = "First User signup as admin";
  } else {
    if (userRole === "USER") {
      linkString = "/user";
      linkText = "User page";
      additionalLinkString = "/";
      additionalLinkText = "Log out";
    } else if (userRole === "ADMIN") {
      linkText = "Admin page";
      linkString = "/admin";
      additionalLinkString = "/";
      additionalLinkText = "Log out";
    }
  }

  const [isAboutMoonOpen, setIsAboutMoonOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);

  const handleAboutMoonModalHover = () => {
    setIsAboutMoonOpen(true);
  };

  const handleAboutUsModalHover = () => {
    setIsAboutUsOpen(true);
  };

  const handleAboutMoonModalClose = () => {
    setIsAboutMoonOpen(false);
  };

  const handleAboutUsModalClose = () => {
    setIsAboutUsOpen(false);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="z-50 absolute top-0 left-0 h-full w-auto flex flex-col items-center bg-gradient-to-b from-gray-900 via-sky-700 to-amber-100">
      <div className="mt-4">
        <img
          src={WhiteMoon}
          alt="Moon Logo"
          className={`h-16 w-16 md:block ${isMenuOpen ? "block" : "hidden"}`}
        />
        <div
          className={`p-2 md:hidden text-gray-200 ${
            isMenuOpen ? "hidden  " : "block"
          }`}
          onClick={() => setIsMenuOpen(true)}
        >
          <AiOutlineMenu />
        </div>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden md:block"
        } text-gray-100 text-start text-sm cursor-pointer ease-in-out duration-300`}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <li
          className="text-start py-3 hover:text-blue-200 hover:scale-95"
          onClick={handleAboutMoonModalHover}
        >
          About Moon
        </li>

        {isAboutMoonOpen && (
          <ModalAboutMoon
            isOpen={isAboutMoonOpen}
            onClose={handleAboutMoonModalClose}
          />
        )}
        <li
          className="text-start py-3 hover:text-blue-200 hover:scale-95 transition"
          onClick={handleAboutUsModalHover}
        >
          About Us
        </li>
        {isAboutUsOpen && (
          <ModalAboutUs
            isOpen={isAboutUsOpen}
            onClose={handleAboutUsModalClose}
          />
        )}
        <li className="text-start py-3 hover:text-blue-200 hover:scale-95 transition">
          <a
            onClick={() => {
              setTimeout(() => {
                setIsAdmin(true);
              }, 1000);
            }}
            href={linkString}
            className="text-start text-gray-100 text-sm py-3 hover:text-blue-200 hover:scale-95 transition"
          >
            {linkText} <span aria-hidden="true">&rarr;</span>
          </a>
        </li>
        {additionalLinkString && (
          <li className="text-start py-3 hover:text-blue-200 hover:scale-95 transition">
            <a
              href={additionalLinkString}
              className="text-start text-gray-100 text-sm py-3 hover:text-blue-200 hover:scale-95 transition"
              onClick={() => authProv.userLogout()}
            >
              {additionalLinkText} <span aria-hidden="true">&rarr;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
