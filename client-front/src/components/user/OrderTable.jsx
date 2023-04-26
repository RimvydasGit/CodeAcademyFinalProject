import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";

function OrderTable({ orders }) {
  const handleClick = () => {
    setShowFullId(!showFullId);
  };
  const [showFullId, setShowFullId] = useState(false);

  let orderList = [];
  if (!orders || orders.length === 0) {
    orderList = (
      <Table.Row key="no-order">
        <Table.Cell collapsing textalign="center" colSpan="3">
          There are no orders yet
        </Table.Cell>
      </Table.Row>
    );
  } else {
    orderList = orders.map((order) => {
      const createdAt = new Date(order.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        ...order,
        createdAt,
      };
    });

    const renderIndicationBulb = (order) => {
      if (order.indicationBulb === "OPEN") {
        return (
          <WiMoonAltWaxingCrescent5 className="text-gray-200" title="NEW" />
        );
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

    orderList.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    orderList = orderList.map((order) => (
      <Table.Row key={order.id}>
        <Table.Cell className="hover:cursor-pointer" onClick={handleClick}>
          {showFullId ? order.id : `${order.id.substr(0, 8)}`}
        </Table.Cell>
        <Table.Cell>{order.createdAt}</Table.Cell>
        <Table.Cell>{order.description}</Table.Cell>
        <Table.Cell>{renderIndicationBulb(order)}</Table.Cell>
      </Table.Row>
    ));
  }

  return (
    <>
      <div className="justify-center text-gray-200">
        <h1 className="md:text-3xl sm:text-xl font-bold lg:mb-6">
          Your orders
        </h1>
        <p className="lg:mb-6 xs:text-xs sm:text-sm md:text-sm lg:text-base">
          Thanks for ordering from the Moon!<br></br> Here's a list of all the
          production pieces we've executed. If you have any questions or want to
          get in touch, we'd love to hear from you!
        </p>
        <NavLink to="/user" className="text-blue-200 hover:text-blue-500">
          <span aria-hidden="true">← </span>
          Back
        </NavLink>
        <div className="w-full overflow-x-auto pr-6 pb-6">
          <Table
            striped
            className="xs:text-xs sm:text-sm md:text-sm lg:text-base table-auto text-gray-200 mt-6 border items-start border-blue-500 appearance-none min-w-full py-2 px-3 leading-5 focus:outline-none"
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="text-left">
                  Order number
                </Table.HeaderCell>
                <Table.HeaderCell className="text-left">Date</Table.HeaderCell>
                <Table.HeaderCell className="text-left">
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell className="text-left">
                  Status
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{orderList}</Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

export default OrderTable;
