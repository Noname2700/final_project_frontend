import { checkResponse } from "./api";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const SORT_OPTIONS = {
  LATEST: "publishedAt",
  RELEVANCY: "relevancy",
  POPULARITY: "popularity",
};

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

  return fetch(`https://newsapi.org/v2/everything?${params.toString()}`)
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.log("Error fetching news:", error);
      throw error;
    });
};
