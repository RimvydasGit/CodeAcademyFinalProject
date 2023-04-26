import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import { handleLogError } from "../utils/Helpers";
import OrderTable from "./OrderTable";
import Navbar from "./Navbar";

function UserOrdersList() {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const [userMe, setUserMe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");

  useEffect(() => {
    const user = getUser();
    if (user && user.data.role[0] !== "USER") {
      navigate("/");
    } else {
      handleGetUserMe();
    }
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e, { name, value }) => {
    setOrderDescription(value);
  };

  const handleGetUserMe = () => {
    const user = getUser();

    setIsLoading(true);
    orderApi
      .getUserMe(user)
      .then((response) => {
        setUserMe(response.data);
      })
      .catch((error) => {
        handleLogError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex h-auto w-screen grow flex-row">
        <div className="fixed left-0 h-full w-auto flex flex-col items-center">
          <Navbar />
        </div>
        <div className="mt-16 ml-32 w-full h-screen flex flex-col justify-between">
          <div>
            <OrderTable
              orders={userMe && userMe.orders}
              isLoading={isLoading}
              orderDescription={orderDescription}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center items-center py-4">
            <p className="text-gray-100 text-xs">
              © 2023 Moon Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserOrdersList;
