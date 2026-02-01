import axios from "axios";
import { refreshToken } from "./auth.js";

const BASE_URL = import.meta.env.VITE_API_URL;

export function checkResponse(response) {
  return response.data;
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
       
        await refreshToken();
       
        return apiClient(originalRequest);
      } catch (refreshError) {
     
        window.dispatchEvent(new CustomEvent("session-expired"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

function getSavedArticles() {
  return apiClient.get("/api/articles").then(checkResponse);
}

function saveArticle(article) {
  if (!article || !article.title || !article.link) {
    return Promise.reject("Invalid article data");
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
    .then(checkResponse);
}

function deleteArticle(articleId) {
  if (!articleId) {
    return Promise.reject("Invalid article ID for deletion");
  }
  return apiClient
    .delete(`/api/articles/${articleId}`)
    .then(checkResponse)
    .then(() => articleId);
}

export default { getSavedArticles, saveArticle, deleteArticle };
