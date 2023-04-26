import React from "react";
import EditUserForm from "./EditUserForm";
import { useParams } from "react-router-dom";
function EditUser(props) {
  const { id } = useParams();
  return (
    <EditUserForm
      userId={id}
      handleUpdateUser={props.handleUpdateUser}
      handleToggleEditUserForm={props.handleToggleEditUserForm}
    />
  );
}

export default EditUser;
