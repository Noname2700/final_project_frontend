import {

  ERROR_MESSAGES,
  LOCAL_STORAGE_KEYS,
} from "./constants.js";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function fetchWithAuth(url, options) {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        return fetch(`/api/users/refresh`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((refreshResponse) => {
            if (refreshResponse.ok) {
              return refreshResponse.json().then((data) => {
                if (data.token) {
                  localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, data.token);
                  return fetch(url, {
                    ...options,
                    headers: {
                      ...options.headers,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${data.token}`,
                    },
                  });
                } else {
                  localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
                  window.dispatchEvent(new CustomEvent("session-expired"));
                  throw new Error(ERROR_MESSAGES.SESSION_EXPIRED);
                }
              });
            }
            throw new Error(ERROR_MESSAGES.TOKEN_REFRESH_FAILED);
          })
          .catch((error) => {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
            window.dispatchEvent(new CustomEvent("session-expired"));
            throw error;
          });
      }
      return response;
    })
    .then(checkResponse);
}

function getSavedArticles() {
  return fetchWithAuth(`/api/articles`, {
    method: "GET",
  });
}

function saveArticle(article) {
  if (!article || !article.title || !article.link) {
    return Promise.reject(ERROR_MESSAGES.INVALID_ARTICLE_DATA);
  }
  return fetchWithAuth(`/api/articles`, {
    method: "POST",
    body: JSON.stringify({
      keyword: article.keyword,
      imageUrl: article.imageUrl,
      title: article.title,
      date: article.date,
      text: article.text,
      source: article.source,
      link: article.link,
    }),
  });
}

function deleteArticle(articleId) {
  if (!articleId) {
    return Promise.reject(ERROR_MESSAGES.INVALID_ARTICLE_ID);
  }

  return fetchWithAuth(`/api/articles/${articleId}`, {
    method: "DELETE",
  }).then(() => articleId);
}

export default { getSavedArticles, saveArticle, deleteArticle, fetchWithAuth };
