import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import { NavLink } from "react-router-dom";
import { Table } from "semantic-ui-react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";

function UserTable({
  users,
  userUsernameSearch,
  handleInputChange,
  handleDeleteUser,
  handleSearchUser,
  handleCreateUser,
  handleUpdateUser,
}) {
  const [editUserId, setEditUserId] = useState(null);
  // eslint-disable-next-line
  const [editMode, setEditMode] = useState(false);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const navigate = useNavigate();
  const handleToggleEditMode = (userId) => {
    if (editUserId === userId) {
      setEditUserId(null);
      setEditMode(false);
    } else {
      setEditUserId(userId);
      setEditMode(true);

      navigate(`/admin/users/${userId}/edit`);
    }
  };
  const handleToggleCreateUserForm = () => {
    setShowCreateUserForm(!showCreateUserForm);
  };

  let userList;
  if (users.length === 0) {
    userList = (
      <Table.Row key="no-user">
        <Table.Cell collapsing colSpan="4">
          No user
        </Table.Cell>
      </Table.Row>
    );
  } else {
    const adminUsers = users.filter((user) => user.role === "ADMIN");
    const numAdminUsers = adminUsers.length;
    userList = users.map((user) => {
      const isDeleteDisabled = user.role === "ADMIN" && numAdminUsers === 1;
      return (
        <Table.Row key={user.id}>
          <Table.Cell>{user.fullName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
          <Table.Cell>
            <Link
              to={`/admin/users/${user.id}/edit`}
              className="text-gray-200 py-3 hover:text-blue-500 hover:scale-95 transition px-6 cursor-pointer"
            >
              <AiOutlineEdit className="inline-block mr-2" />
            </Link>
            <Link
              className="text-gray-200 py-3 hover:text-blue-500 hover:scale-95 transition px-6 cursor-pointer"
              onClick={() => {
                if (!isDeleteDisabled) {
                  handleDeleteUser(user.email);
                } else {
                  alert("Last admin can't be deleted!");
                }
              }}
            >
              <AiOutlineDelete className="inline-block mr-2" />
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <div className="top-0 h-screen w-screen min-h-full ">
      <div className="top-0 md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 justify-center text-gray-200">
        <h1 className="md:text-3xl sm:text-xl py-10 font-bold lg:mb-6">
          User List
        </h1>
        <p className="lg:mb-6 xs:text-xs sm:text-sm md:text-sm lg:text-base text-gray-500">
          Here's a list of all active users that are registered in Moon website.
        </p>
        <NavLink to="/user" className="text-blue-200 hover:text-blue-500">
          <span aria-hidden="true">← </span>
          Back
        </NavLink>
      </div>

      {showCreateUserForm && (
        <CreateUserForm
          handleCreateUser={handleCreateUser}
          handleToggleCreateUserForm={handleToggleCreateUserForm}
        />
      )}
      {editUserId && (
        <EditUserForm
          userId={editUserId}
          handleUpdateUser={handleUpdateUser}
          handleToggleEditUserForm={() => handleToggleEditMode(null)}
        />
      )}
      <br />
      <div className="md:ml-24 lg:mb-3 sm:ml-24 lg:ml-28 xl:ml-28 mt-2 justify-center text-gray-200">
        <Link
          to="/admin/users/add"
          className="text-gray-200 py-3 text-md text-center border-none hover:text-blue-500 hover:scale-95 transition cursor-pointer"
        >
          <AiOutlineUserAdd className="inline-block mr-2" />
          Add User
        </Link>
      </div>
      <div className="md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 justify-center text-gray-200">
        <form onSubmit={handleSearchUser}>
          <div className="flex items-center ">
            <input
              type="text"
              placeholder="Search by Email"
              maxLength={100}
              aria-label="Search by Email"
              className="bg-[#060f25] border rounded py-2 px-3 text-gray-200 text-sm leading-tight focus:outline-none focus:shadow-outline"
              value={userUsernameSearch}
              onChange={(e) =>
                handleInputChange(e, {
                  name: "userUsernameSearch",
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
      <div className="md:ml-24 sm:ml-24 lg:ml-28 xl:ml-28 mt-2 mr-2 justify-center text-gray-200">
        <Table
          compact
          striped
          className="xs:text-xs sm:text-sm md:text-sm lg:text-base table-auto text-gray-200 mt-6 border items-start border-blue-500 appearance-none min-w-full py-2 px-3 leading-5 focus:outline-none"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="text-left">
                Fullname
              </Table.HeaderCell>
              <Table.HeaderCell className="text-left">Email</Table.HeaderCell>
              <Table.HeaderCell className="text-left">Role</Table.HeaderCell>
              <Table.HeaderCell className="text-left"></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{userList}</Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default UserTable;
