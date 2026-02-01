import axios from "axios";
import { checkResponse } from "./api.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

function request(url, method, data) {
  return axios({
    url,
    method,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }).then(checkResponse);
}

export const signup = ({ email, password, username }) => {
  return request(`${BASE_URL}/api/users/signup`, "POST", {
    email,
    password,
    name: username,
  });
};

export const signin = ({ email, password }) => {
  return request(`${BASE_URL}/api/users/signin`, "POST", { email, password });
};

export const signout = () => {
  return request(`${BASE_URL}/api/users/signout`, "POST");
};

export const getCurrentUser = () => {
  return request(`${BASE_URL}/api/users/me`, "GET");
};

export const refreshToken = () => {
  return request(`${BASE_URL}/api/users/refresh`, "POST");
};
