import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import OrderTable from "./OrderTable";
import { AuthProvider } from "../auth/AuthContext";
import WhiteMoon from "../../assets/WhiteMoon.png";
import {
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  AiOutlineUnorderedList,
  AiOutlineLogout,
} from "react-icons/ai";
import Camera11 from "../../assets/Camera11.jpg";

const AdminTab = (props) => {
  const { handleInputChange } = props;
  const {
    indicationBulb,
    setIndicationBulb,
    isUsersLoading,
    users,
    userUsernameSearch,
    handleDeleteUser,
    handleSearchUser,
    handleGetOrders,
  } = props;
  const {
    isOrdersLoading,
    orders,
    orderDescription,
    orderTextSearch,
    handleCreateOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleSearchOrder,
  } = props;
  const authProv = new AuthProvider();

  const [activeTab, setActiveTab] = useState("users");
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex-wrap h-screen top-0 w-screen grow flex-row">
        <nav className="fixed left-0 top-0 h-screen w-auto flex flex-col items-center bg-gradient-to-b from-gray-900 via-sky-700 to-amber-100">
          <img
            src={WhiteMoon}
            alt="Moon Logo"
            className="h-16 w-16 mt-4 ml-4"
          />
          <ul className="text-gray-100 text-start text-sm cursor-pointer">
            <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
              <Link to="/admin" onClick={handleRefreshClick}>
                <div className="inline-block w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={Camera11}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </li>
            <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
              <Link to="/" title="Home">
                <AiOutlineHome className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
              </Link>
            </li>
            <li className="py-3 hover:text-blue-200 hover:scale-95 transition">
              <Link
                title="List of users"
                className={` ${
                  activeTab === "users"
                    ? "mr-4 backdrop-blur-sm text-gray-100 text-center py-3 hover:text-blue-500 group hover:scale-95 transition"
                    : "mr-4 backdrop-blur-sm text-gray-100 text-center py-3 hover:text-blue-500 group hover:scale-95 transition"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <AiOutlineUsergroupAdd className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
              </Link>
            </li>
            <li className="py-3 hover:text-blue-500 hover:scale-95 transition">
              <Link
                title="List of orders"
                className={` ${
                  activeTab === "orders"
                    ? "mr-4 backdrop-blur-sm text-gray-100 text-center py-3 hover:text-blue-500 group hover:scale-95 transition"
                    : "mr-4 backdrop-blur-sm text-gray-100 text-center py-3 hover:text-blue-500 group hover:scale-95 transition"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <AiOutlineUnorderedList className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
              </Link>
            </li>
            <li className="py-3 hover:text-blue-500 hover:scale-95 transition">
              <Link
                to="/"
                className="text-sm font-semibold leading-6 text-gray-100 hover:text-blue-500 hover:scale-95"
                onClick={() => authProv.userLogout()}
              >
                <AiOutlineLogout className="inline-block mr-2 w-6 h-6 hover:marker:to-blue-500" />
              </Link>
            </li>
          </ul>
        </nav>

        {activeTab === "users" && (
          <div className=" border-gray-200 sm:rounded-lg py-10">
            {isUsersLoading && <div>Loading users...</div>}
            <UserTable
              users={users}
              userUsernameSearch={userUsernameSearch}
              handleInputChange={handleInputChange}
              handleDeleteUser={handleDeleteUser}
              handleSearchUser={handleSearchUser}
            />
          </div>
        )}
        {activeTab === "orders" && (
          <div className=" border-gray-200 sm:rounded-lg py-10 h-full body w-screen">
            {isOrdersLoading && <div>Loading orders...</div>}
            <OrderTable
              indicationBulb={indicationBulb}
              setIndicationBulb={setIndicationBulb}
              orders={orders}
              handleGetOrders={handleGetOrders}
              orderDescription={orderDescription}
              orderTextSearch={orderTextSearch}
              handleInputChange={handleInputChange}
              handleCreateOrder={handleCreateOrder}
              handleUpdateOrder={handleUpdateOrder}
              handleDeleteOrder={handleDeleteOrder}
              handleSearchOrder={handleSearchOrder}
            />
          </div>
        )}
        <div className="flex text-gray-200 justify-center w-screen items-center bottom-0 py-4 h-1/8">
          <p className="text-xs">© 2023 Moon Company. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default AdminTab;
