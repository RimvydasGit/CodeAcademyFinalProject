import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import OrderForm from "./OrderForm";
import OrderEditModal from "./OrderEditModal";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineCloseSquare,
  AiOutlineFolderAdd,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";

function OrderTable({
  indicationBulb,
  setIndicationBulb,
  orders,
  orderDescription,
  orderTextSearch,
  handleGetOrders,
  handleInputChange,
  handleCreateOrder,
  handleDeleteOrder,
  handleSearchOrder,
  handleUpdateOrder,
}) {
  const renderIndicationBulb = (order) => {
    if (order.indicationBulb === "OPEN") {
      return <WiMoonAltWaxingCrescent5 className="text-gray-200" title="NEW" />;
    } else if (order.indicationBulb === "ONGOING") {
      return (
        <WiMoonAltWaxingCrescent5
          className="text-amber-500"
          title="IN PROCESS"
        />
      );
    } else if (order.indicationBulb === "FINISHED") {
      return (
        <WiMoonAltWaxingCrescent5 className="text-lime-500" title="DONE" />
      );
    } else {
      return null;
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };
  const handleClick = () => {
    setShowFullId(!showFullId);
  };
  const [showFullId, setShowFullId] = useState(false);
  let orderList;
  if (orders.length === 0) {
    orderList = (
      <Table.Row key="no-order">
        <Table.Cell collapsing colSpan="4">
          No orders
        </Table.Cell>
      </Table.Row>
    );
  } else {
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    orderList = orders.map((order) => {
      const createdAt = new Date(order.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      const isSelected = selectedOrder && selectedOrder.id === order.id;
      return (
        <Table.Row key={order.id}>
          <Table.Cell></Table.Cell>
          <Table.Cell className="hover:cursor-pointer" onClick={handleClick}>
            {showFullId ? order.id : `${order.id.substr(0, 8)}`}
          </Table.Cell>
          <Table.Cell>{order.user.email}</Table.Cell>
          <Table.Cell className="hover:cursor-pointer">{createdAt}</Table.Cell>
          <Table.Cell>{order.description}</Table.Cell>
          <Table.Cell>{renderIndicationBulb(order)}</Table.Cell>
          <Table.Cell>
            <Link className="text-gray-200 text-center py-3 hover:text-blue-500 hover:scale-95 transition px-6 cursor-pointer">
              <AiOutlineEdit
                className="inline-block mr-2"
                onClick={() => {
                  setSelectedOrder(order);
                }}
              />
            </Link>
            {isSelected && (
              <OrderEditModal
                order={order}
                open={true}
                setOpen={() => setSelectedOrder(null)}
                handleGetOrders={handleGetOrders}
                handleUpdateOrder={handleUpdateOrder}
              />
            )}
            <Link className="text-gray-200 text-center py-3 hover:text-blue-500 hover:scale-95 transition px-6 cursor-pointer">
              <AiOutlineDelete
                className="inline-block mr-2"
                onClick={() => handleDeleteOrder(order.id)}
              />
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <>
      <div className="top-0 md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 justify-center text-gray-200">
        <h1 className="md:text-3xl sm:text-xl py-10 font-bold lg:mb-6">
          Order List
        </h1>
        <p className="lg:mb-6 xs:text-xs sm:text-sm md:text-sm lg:text-base text-gray-500">
          Here's a list of all orders that are registered in Moon website.
        </p>
        <NavLink to="/user" className="text-blue-200 hover:text-blue-500">
          <span aria-hidden="true">← </span>
          Back
        </NavLink>
      </div>
      <div className="md:ml-24 lg:mb-3 sm:ml-24 lg:ml-28 xl:ml-28 mt-2 justify-center text-gray-200">
        <Link
          onClick={handleButtonClick}
          className="text-gray-200 py-3 text-md text-start border-none hover:text-blue-500 hover:scale-95 transition cursor-pointer"
        >
          {showForm ? (
            <>
              <AiOutlineCloseSquare className="inline-block mr-2" />
              Close Form
            </>
          ) : (
            <>
              <AiOutlineFolderAdd className="inline-block mr-2" />
              Add Order
            </>
          )}
        </Link>

        {showForm && (
          <OrderForm
            orderDescription={orderDescription}
            handleInputChange={handleInputChange}
            handleCreateOrder={handleCreateOrder}
            indicationBulb={indicationBulb}
            setIndicationBulb={setIndicationBulb}
          />
        )}
      </div>
      <div className="md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 justify-center text-gray-200">
        <form onSubmit={handleSearchOrder}>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Order by Id"
              maxLength={100}
              className="border rounded py-2 px-3 text-gray-200 bg-[#060f25] text-sm leading-tight focus:outline-none focus:shadow-outline"
              value={orderTextSearch}
              onChange={(e) =>
                handleInputChange(e, {
                  name: "orderTextSearch",
                  value: e.target.value,
                })
              }
            />
            <button
              className="text-gray-200 text-md text-center border-none py-3 hover:text-blue-500 hover:scale-95 transition px-2 cursor-pointer"
              type="submit"
            >
              <AiOutlineSearch className="inline-block mr-2" />
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 mt-2 mr-2 justify-center text-gray-200 ">
        <Table
          compact
          striped
          selectable
          className="xs:text-xs sm:text-sm md:text-sm lg:text-base table-auto text-gray-200 mt-6 border items-start border-blue-500 appearance-none min-w-full py-2 px-3 leading-5 focus:outline-none"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell className="text-left">
                Order Number
              </Table.HeaderCell>
              <Table.HeaderCell className="text-left">
                Username
              </Table.HeaderCell>
              <Table.HeaderCell className="text-left">Date</Table.HeaderCell>
              <Table.HeaderCell className="text-left">
                Description
              </Table.HeaderCell>
              <Table.HeaderCell className="text-left">Status</Table.HeaderCell>
              <Table.HeaderCell className="text-left"></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{orderList}</Table.Body>
        </Table>
      </div>
    </>
  );
}

export default OrderTable;
