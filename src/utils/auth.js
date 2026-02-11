import { apiClient, checkResponse } from "./api.js";

export const signup = ({ email, password, username }) => {
  return apiClient
    .post("/api/users/signup", {
      email,
      password,
      name: username,
    })
    .then(checkResponse);
};

export const signin = ({ email, password }) => {
  return apiClient
    .post("/api/users/signin", { email, password })
    .then(checkResponse);
};

export const signout = () => {
  return apiClient.post("/api/users/signout").then(checkResponse);
};

export const getCurrentUser = () => {
  return apiClient.get("/api/users/me").then(checkResponse);
};

export const refreshToken = () => {
  return apiClient.post("/api/users/refresh").then(checkResponse);
};
