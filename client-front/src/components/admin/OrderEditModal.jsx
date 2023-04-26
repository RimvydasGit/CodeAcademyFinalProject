import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import { AuthProvider } from "../auth/AuthContext";
import { config } from "../../Constants.js";
import axios from "axios";
import { orderApi } from "../services/OrderApi";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function OrderEditModal({ order, open, setOpen, handleGetOrders }) {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [description, setDescription] = useState(order.description);
  const [indicationBulb, setIndicationBulb] = useState(order.indicationBulb);
  const [orderId] = useState(order.id);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedOrder({
      ...updatedOrder,
      [name]: value,
      description: value,
      indicationBulb,
    }); // update updatedOrder state
    setDescription(value);
  };
  const handleUpdateClick = async (event) => {
    event.preventDefault();
    const authProv = new AuthProvider();
    const updatedOrderData = {
      indicationBulb,
      description,
    };
    await axios
      .put(
        `${config.url.API_BASE_URL}/api/v1/orders/${orderId}`,
        updatedOrderData,
        {
          headers: { Authorization: orderApi.bearerAuth(authProv.getUser()) },
        }
      )
      .then((response) => {
        handleGetOrders();
      })
      .catch((error) => {
        console.log(error);
      });

    setOpen(false);
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleCancelClick}>
      <div className="fixed z-10 inset-0 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <div className="flex items-center justify-center min-h-screen mx-4 md:mx-0 p-10">
          <div className="fixed inset-0"></div>
          <Modal.Content className="max-w-2xl mx-auto bg-[#060f25] opacity-80 text-gray-200 rounded-lg p-8 inline-block">
            <div className="flex jusitify-center mb-4">
              <NavLink to="/admin" onClick={handleCancelClick}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-blue-200 hover:text-blue-500"
                />
              </NavLink>
            </div>
            <form onSubmit={handleUpdateClick} className="w-full h-full">
              <h2 className="text-3xl text-start mb-4 text-gray-200">
                Order ID
              </h2>
              <p className="mb-4">{orderId}</p>
              <h4 className="text-start mb-4 text-gray-500">
                In order to adjust information for chosen Order, please insert
                new information under Comment and/or update the Order Status
                under Status and press Save
              </h4>
              <label className="block font-bold mt-4 mb-2 text-gray-200">
                Order Information
              </label>
              <input
                className="bg-[#060f25] appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                name="order information"
                placeholder="Order Information"
                value={description}
                onChange={(event) =>
                  handleInputChange(event, {
                    name: "orderInformation",
                    value: event.target.value,
                  })
                }
              />
              <label className="block font-bold mt-4 mb-2 text-gray-200">
                Order Status
              </label>
              <select
                className="text-gray-200 text-sm appearance-none border rounded w-full py-2 px-3 bg-[#060f25] leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                value={indicationBulb}
                placeholder="Order Status"
                onChange={(event) => setIndicationBulb(event.target.value)}
                id="indicationBulb"
              >
                <option value="OPEN">OPEN</option>
                <option value="ONGOING">ONGOING</option>
                <option value="FINISHED">FINISHED</option>
              </select>
              <Button
                type="submit"
                className="w-full mt-4 text-gray-200 text-center border border-blue-500 p-2 hover:bg-blue-500 rounded-lg px-4  hover:text-gray-700"
              >
                Update
              </Button>
            </form>
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
}

export default OrderEditModal;
