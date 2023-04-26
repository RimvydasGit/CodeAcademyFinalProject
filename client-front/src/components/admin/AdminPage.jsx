import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { orderApi } from "../services/OrderApi";
import AdminTab from "./AdminTab";
import { handleLogError } from "../utils/Helpers";

const AdminPage = () => {
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const isAdmin = user.data.role[0] === "ADMIN";
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDescription, setOrderDescription] = useState("");
  const [orderTextSearch, setOrderTextSearch] = useState("");
  const [userUsernameSearch, setUserUsernameSearch] = useState("");
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [indicationBulb, setIndicationBulb] = useState("OPEN");

  useEffect(() => {
    handleGetUsers();
    handleGetOrders();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e, { name, value }) => {
    switch (name) {
      case "userUsernameSearch":
        setUserUsernameSearch(value);
        break;
      case "orderDescription":
        setOrderDescription(value);
        break;
      case "orderTextSearch":
        setOrderTextSearch(value);
        break;
      default:
        break;
    }
  };

  const handleGetUsers = () => {
    setIsUsersLoading(true);
    orderApi
      .getUsers(user)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        handleLogError(error);
      })
      .finally(() => {
        setIsUsersLoading(false);
      });
  };

  const handleDeleteUser = (username) => {
    orderApi
      .deleteUser(user, username)
      .then(() => {
        handleGetUsers();
      })
      .catch((error) => {
        handleLogError(error);
      });
  };

  const handleSearchUser = (event) => {
    event.preventDefault();

    const username = userUsernameSearch;
    orderApi
      .getUsers(user, username)
      .then((response) => {
        const data = response.data;
        const users = data instanceof Array ? data : [data];
        setUsers(users);
      })
      .catch((error) => {
        handleLogError(error);
        setUsers([]);
      });
  };

  const handleGetOrders = () => {
    setIsOrdersLoading(true);
    orderApi
      .getOrders(user)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        handleLogError(error);
      })
      .finally(() => {
        setIsOrdersLoading(false);
      });
  };

  const handleDeleteOrder = (isbn) => {
    orderApi
      .deleteOrder(user, isbn)
      .then(() => {
        handleGetOrders();
      })
      .catch((error) => {
        handleLogError(error);
      });
  };

  const handleCreateOrder = () => {
    let trimmedOrderDescription = orderDescription.trim();
    if (!trimmedOrderDescription) {
      return;
    }

    const order = { indicationBulb, description: trimmedOrderDescription };
    orderApi
      .createOrder(user, order)
      .then(() => {
        handleGetOrders();
        setOrderDescription("");
        setIndicationBulb("");
      })
      .catch((error) => {
        handleLogError(error);
      });
  };

  const handleUpdateOrder = async (orderId, updateOrderRequest) => {
    try {
      const updatedOrder = await orderApi.updateOrder(
        orderId,
        updateOrderRequest
      );
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? updatedOrder : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchOrder = (event) => {
    event.preventDefault();
    orderApi
      .getOrders(user)
      .then((response) => {
        const orders = response.data;
        const filteredOrders = orders.filter((order) =>
          order.id.includes(orderTextSearch.trim())
        );
        setOrders(filteredOrders);
      })
      .catch((error) => {
        handleLogError(error);
        setOrders([]);
      });
  };
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <AdminTab
        isUsersLoading={isUsersLoading}
        users={users}
        userUsernameSearch={userUsernameSearch}
        handleDeleteUser={handleDeleteUser}
        handleSearchUser={handleSearchUser}
        isOrdersLoading={isOrdersLoading}
        orders={orders}
        orderDescription={orderDescription}
        indicationBulb={indicationBulb}
        setIndicationBulb={setIndicationBulb}
        orderTextSearch={orderTextSearch}
        handleCreateOrder={handleCreateOrder}
        handleUpdateOrder={handleUpdateOrder}
        handleDeleteOrder={handleDeleteOrder}
        handleSearchOrder={handleSearchOrder}
        handleInputChange={handleInputChange}
        handleGetOrders={handleGetOrders}
      />
    </>
  );
};

export default AdminPage;
