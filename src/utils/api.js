import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export function checkResponse(response) {
  return response.data;
}

function handleApiError(error) {
  console.error("API error:", error);
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
        new Error("Invalid article request. Please try again."),
      );
    case 404:
      return Promise.reject(
        new Error("Resource not found. Please check your request."),
      );
    case 401:
      return Promise.reject(
        new Error("Unauthorized access. Please sign up or log in."),
      );
    case 403:
      return Promise.reject(
        new Error(
          "Forbidden. You do not have permission to access this resource.",
        ),
      );
    case 409:
      return Promise.reject(
        new Error(
          "Conflict. The article already exists in your saved articles.",
        ),
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

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/api/users/refresh");
        return apiClient(originalRequest);
      } catch (refreshError) {
        window.dispatchEvent(new CustomEvent("session-expired"));
        return handleApiError(refreshError);
      }
    }

    return handleApiError(error);
  },
);

function getSavedArticles() {
  return apiClient
    .get("/api/articles")
    .then(checkResponse)
    .catch(handleApiError);
}

function saveArticle(article) {
  if (!article || !article.title || !article.link) {
    return Promise.reject(new Error("Invalid article data"));
  }
  return apiClient
    .post("/api/articles", {
      keyword: article.keyword,
      imageUrl: article.imageUrl,
      title: article.title,
      date: article.date,
      text: article.text,
      source: article.source,
      link: article.link,
    })
    .then(checkResponse)
    .catch(handleApiError);
}

function deleteArticle(articleId) {
  if (!articleId) {
    return Promise.reject("Invalid article ID for deletion");
  }
  return apiClient
    .delete(`/api/articles/${articleId}`)
    .then(checkResponse)
    .then(() => articleId)
    .catch(handleApiError);
}

export { apiClient };
export default { getSavedArticles, saveArticle, deleteArticle };
