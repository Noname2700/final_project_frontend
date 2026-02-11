import axios from "axios";
import { checkResponse } from "./api";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const SORT_OPTIONS = {
  LATEST: "publishedAt",
  RELEVANCY: "relevancy",
  POPULARITY: "popularity",
};

function handleNewsApiError(error) {
  console.error("News API error:", error);

  // Priority 1: Backend/API message
  if (error.response?.data?.message) {
    return Promise.reject(new Error(error.response.data.message));
  }

  // Priority 2: Network error (no response from server)
  if (!error.response) {
    return Promise.reject(
      new Error("Cannot connect to news service. Please check your internet connection."),
    );
  }

  // Priority 3: Status-specific messages
  const status = error.response.status;
  switch (status) {
    case 401:
      return Promise.reject(new Error("Invalid news API key. Please contact support."));
    case 429:
      return Promise.reject(new Error("Too many search requests. Please try again in a moment."));
    case 400:
      return Promise.reject(new Error("Invalid search query. Please try different keywords."));
    case 500:
      return Promise.reject(new Error("News service error. Please try again later."));
    default:
      return Promise.reject(new Error("Failed to fetch news. Please try again."));
  }
}

export const getNews = ({
  query = "news",
  language = "en",
  sortBy = SORT_OPTIONS.POPULARITY,
  from,
  to,
}) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const toDate = to || today.toISOString().split("T")[0];
  const fromDate = from || sevenDaysAgo.toISOString().split("T")[0];

  const params = new URLSearchParams({
    q: query,
    language: language,
    sortBy: sortBy,
    apiKey: NEWS_API_KEY,
    pageSize: 100,
    from: fromDate,
    to: toDate,
  });

  
  const newsApiBaseUrl = import.meta.env.PROD
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

  return axios
    .get(`${newsApiBaseUrl}?${params.toString()}`)
    .then((res) => checkResponse(res))
    .catch(handleNewsApiError);
};
