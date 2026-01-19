const BASE_URL =  import.meta.env.VITE_API_URL || "https://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getSavedArticles() {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  }).then(checkResponse);
}

function saveArticle(article) {
  if (!article || !article.title || !article.url) {
    return Promise.reject("Invalid article data");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      keyword: article.keyword,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
      url: article.url,
      urlToImage: article.urlToImage,
    }),
  }).then(checkResponse);
}

function deleteArticle(articleId) {
  if (!articleId) {
    return Promise.reject("Invalid article ID for deletion");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then(checkResponse)
    .then(() => articleId);
}

export default { getSavedArticles, saveArticle, deleteArticle };
