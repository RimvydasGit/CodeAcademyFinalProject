import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "../utils/Helpers";

export const orderApi = {
  authenticate,
  signup,
  numberOfUsers,
  numberOfOrders,
  getUsers,
  deleteUser,
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  getUserMe,
  bearerAuth,
  isAdmin,
};

function authenticate(email, password) {
  return instance.post(
    "/api/v1/auth/authenticate",
    { email, password },
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function signup(user) {
  return instance.post("/api/v1/auth/signup", user, {
    headers: { "Content-type": "application/json" },
  });
}
async function isAdmin() {
  try {
    const response = await instance.get("/api/v1/users/adminExists");
    const isAdmin = response.data;
    return isAdmin;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function numberOfUsers() {
  return instance.get("/public/numberOfUsers");
}

function numberOfOrders() {
  return instance.get("/public/numberOfOrders");
}

function getUsers(user, email) {
  const url = email ? `/api/v1/users/${email}` : "/api/v1/users";
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteUser(user, email) {
  return instance.delete(`/api/v1/users/${email}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getOrders(user) {
  return instance.get("/api/v1/orders", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function updateOrder(user, orderId, updateOrderRequest) {
  return instance.put(`/api/v1/orders/${orderId}`, updateOrderRequest, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteOrder(user, orderId) {
  return instance.delete(`/api/v1/orders/${orderId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createOrder(user, order) {
  return instance.post("/api/v1/orders", order, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function getUserMe(user) {
  return instance.get("/api/v1/users/me", {
    headers: { Authorization: bearerAuth(user) },
  });
}

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        window.location.href = "/login";
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`;
}
