import axios from "axios";
import { checkResponse } from "./api.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

function request(url, method, data, token) {
  return axios({
    url,
    method,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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

export const checkToken = (token) => {
  return request(`${BASE_URL}/api/users/me`, "GET", undefined, token);
};
