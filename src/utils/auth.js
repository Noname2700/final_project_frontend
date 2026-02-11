import { apiClient, checkResponse } from "./api.js";

function handleAuthError(error) {
  console.error("Authentication API error:", error);
  // Priority 1: Backend sent a specific message
  if (error.response?.data?.message) {
    return Promise.reject(new Error(error.response.data.message));
  }

  // Priority 2: Network error (no response from server)
  if (!error.response) {
    return Promise.reject(
      new Error(
        "Network error. Please check your internet connection and try again.",
      ),
    );
  }

  // Priority 3: Handle specific status codes
  const status = error.response.status;
  switch (status) {
    case 400:
      return Promise.reject(
        new Error("Invalid request. Please check your input."),
      );
    case 401:
      return Promise.reject(
        new Error("Unauthorized. Please check your credentials."),
      );
    case 403:
      return Promise.reject(
        new Error(
          "Forbidden. You do not have permission to access this resource.",
        ),
      );
      case 409:
      return Promise.reject(
        new Error("Conflict. The email is already registered."),
      );
    case 429:
      return Promise.reject(
        new Error("Too many requests. Please wait and try again later."),
      );
    case 500:
      return Promise.reject(new Error("Server error. Please try again later."));
    default:
      return Promise.reject(
        new Error("An unexpected error occurred. Please try again."),
      );
  }
}
export const signup = ({ email, password, username }) => {
  return apiClient
    .post("/api/users/signup", {
      email,
      password,
      name: username,
    })
    .then(checkResponse)
    .catch(handleAuthError);
};

export const signin = ({ email, password }) => {
  return apiClient
    .post("/api/users/signin", { email, password })
    .then(checkResponse)
    .catch(handleAuthError);
};

export const signout = () => {
  return apiClient
    .post("/api/users/signout")
    .then(checkResponse)
    .catch(handleAuthError);
};

export const getCurrentUser = () => {
  return apiClient
    .get("/api/users/me")
    .then(checkResponse)
    .catch(handleAuthError);
};

export const refreshToken = () => {
  return apiClient
    .post("/api/users/refresh")
    .then(checkResponse)
    .catch(handleAuthError);
};
