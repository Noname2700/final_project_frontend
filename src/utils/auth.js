import {

  ERROR_MESSAGES,
  LOCAL_STORAGE_KEYS,
} from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, method, data) {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options).then(checkResponse);
}

export const signup = ({ email, password, username }) => {
  return request(`/api/users/signup`, "POST", {
    email,
    password,
    name: username,
  }).then((data) => {
    if (data.token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, data.token);
    } else {
      throw new Error(ERROR_MESSAGES.REGISTRATION_FAILED);
    }
    return data;
  });
};

export const signin = ({ email, password }) => {
  return request(`/api/users/signin`, "POST", {
    email,
    password,
  }).then((data) => {
    if (data.token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, data.token);
    }
    return data;
  });
};

export const signout = () => {
  return request(`/api/users/signout`, "POST")
    .then(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
      throw new Error(ERROR_MESSAGES.SIGNOUT_ERROR);
    });
};

export const getCurrentUser = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
  if (!token) {
    return Promise.reject(ERROR_MESSAGES.NO_TOKEN);
  }

  return fetch(`/api/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then(checkResponse);
};

export const refreshToken = () => {
  return request(`/api/users/refresh`, "POST");
};
