import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/utils/PrivateRoute";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import AdminPage from "./components/admin/AdminPage";
import CreateUserForm from "./components/admin/CreateUserForm";
import EditUser from "./components/admin/EditUser";
import UserPage from "./components/user/UserPage";
import { AuthProvider } from "./components/auth/AuthContext";
import Home from "./components/home/Home";
import EditUserDetails from "./components/user/EditUserDetails";
import OrderList from "./components/user/OrderList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="ADMIN">
                {" "}
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users/:id/edit"
            element={
              <PrivateRoute role="ADMIN">
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users/add"
            element={
              <PrivateRoute role="ADMIN">
                <CreateUserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute role={["USER", "ADMIN"]}>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/edit"
            element={
              <PrivateRoute role={["USER", "ADMIN"]}>
                <EditUserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/orders"
            element={
              <PrivateRoute role={["USER", "ADMIN"]}>
                <OrderList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
