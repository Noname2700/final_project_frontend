import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function checkResponse(response) {
  return response.data;
}

function getSavedArticles() {
  const token = localStorage.getItem("jwt");
  return axios
    .get(`${BASE_URL}/api/articles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then(checkResponse);
}

function saveArticle(article) {
  if (!article || !article.title || !article.link) {
    return Promise.reject("Invalid article data");
  }
  const token = localStorage.getItem("jwt");
  return axios
    .post(
      `${BASE_URL}/api/articles`,
      {
        keyword: article.keyword,
        imageUrl: article.imageUrl,
        title: article.title,
        date: article.date,
        text: article.text,
        source: article.source,
        link: article.link,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    )
    .then(checkResponse);
}

function deleteArticle(articleId) {
  if (!articleId) {
    return Promise.reject("Invalid article ID for deletion");
  }
  const token = localStorage.getItem("jwt");
  return axios
    .delete(`${BASE_URL}/api/articles/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then(checkResponse)
    .then(() => articleId);
}

export default { getSavedArticles, saveArticle, deleteArticle };
