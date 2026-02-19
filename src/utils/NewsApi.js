import { NEWS_API_KEY, NEWS_API_BASE_URL } from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
export const SORT_OPTIONS = {
  LATEST: "publishedAt",
  RELEVANCY: "relevancy",
  POPULARITY: "popularity",
};

const PAGE_SIZE = 100;
const DAYS_TO_SEARCH = 7;

export const getNews = ({
  query = "news",
  language = "en",
  sortBy = SORT_OPTIONS.POPULARITY,
  from,
  to,
}) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - DAYS_TO_SEARCH);

  const toDate = to || today.toISOString().split("T")[0];
  const fromDate = from || sevenDaysAgo.toISOString().split("T")[0];

  const params = new URLSearchParams({
    q: query,
    language: language,
    sortBy: sortBy,
    apiKey: NEWS_API_KEY,
    pageSize: PAGE_SIZE,
    from: fromDate,
    to: toDate,
  });

  const newsApiBaseUrl = import.meta.env.PROD
    ? "https://nomoreparties.co/news/v2/everything"
    : NEWS_API_BASE_URL;

  return fetch(`${newsApiBaseUrl}?${params.toString()}`)
    .then(checkResponse)
    .catch((error) => {
      console.log("Error fetching news:", error);
      throw error;
    });
};
