const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.api.jumpingcrab.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`, { cache: "no-store" }).then(checkResponse);
}

function postItems({ name, imageUrl, weather }) {
  if (!name || !imageUrl || !weather) {
    return Promise.reject("Invalid item data");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
}

function saveItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "PUT",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  }).then(checkResponse);
}

function deleteItem(item) {
  if (!item || !item._id) {
    return Promise.reject("Invalid item for deletion");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then(checkResponse)
    .then(() => item._id);
}

export { getItems, postItems, deleteItem, saveItem };
