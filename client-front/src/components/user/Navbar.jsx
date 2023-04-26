import React from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import WhiteMoon from "../../assets/WhiteMoon.png";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineLogout,
} from "react-icons/ai";
import Camera11 from "../../assets/Camera11.jpg";

function Navbar() {
  const authProv = new AuthProvider();
  return (
    <nav className="fixed left-0 h-full w-auto flex flex-col items-center bg-gradient-to-b from-gray-900 via-sky-700 to-amber-100">
      <div className="mt-4 ml-4">
        <img src={WhiteMoon} alt="Moon Logo" className="h-16 w-16" />
      </div>
      <ul className="text-gray-100 text-start text-sm cursor-pointer">
        <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
          <Link to="/user">
            {/* title={authProv.getUserFullName()} */}
            <div className="inline-block w-8 h-8 rounded-full overflow-hidden">
              <img
                src={Camera11}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* {authProv.getUserFullName()} */}
          </Link>
        </li>
        <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
          <Link to="/" title="Home">
            <AiOutlineHome className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
          </Link>
        </li>
        <li className=" py-3 hover:text-blue-200 hover:scale-95 transition">
          <Link to="/user/edit" title="Edit profile">
            <AiOutlineUser className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
          </Link>
        </li>
        <li className=" py-3 hover:text-blue-200 hover:scale-95 transition">
          <Link to="/user/orders" title="List">
            <AiOutlineUnorderedList className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
          </Link>
        </li>
        <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
          <Link
            to="/"
            title="Log out"
            className="text-sm font-semibold leading-6 text-gray-100 hover:text-blue-200 hover:scale-95 rounded"
            onClick={() => authProv.userLogout()}
          >
            <AiOutlineLogout className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
