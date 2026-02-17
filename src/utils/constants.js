// API Configuration
export const BASE_API_URL = import.meta.env.VITE_API_URL || "";

// News API Configuration
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
export const NEWS_API_BASE_URL = "https://newsapi.org/v2/everything";

// Pagination
export const ARTICLES_PER_PAGE = 3;

// Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Error Messages
export const ERROR_MESSAGES = {
  ALL_FIELDS_REQUIRED: "All fields are required",
  INVALID_EMAIL: "Invalid email format",
  INVALID_PASSWORD:
    "Password must be at least 6 characters long and contain both letters and numbers",
  EMAIL_AND_PASSWORD_REQUIRED: "Both email and password are required",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
  LOGIN_FAILED: "Login failed. Please check your credentials and try again.",
  INVALID_CREDENTIALS: "Invalid credentials. Please try again.",
  SERVER_ERROR: "The server encountered an error. Please try again later.",
  FETCH_PROFILE_FAILED: "Failed to fetch user profile.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
  FETCH_ARTICLES_FAILED: "Failed to fetch saved articles. Please try again.",
  FETCH_NEWS_FAILED: "Failed to fetch news articles. Please try again.",
  SAVE_ARTICLE_FAILED: "Failed to save article. Please try again.",
  DELETE_ARTICLE_FAILED: "Failed to delete article. Please try again.",
  SIGNOUT_ERROR: "Error signing out. Please try again.",
  NO_TOKEN: "No token found",
  TOKEN_REFRESH_FAILED: "Token refresh failed",
  INVALID_ARTICLE_DATA: "Invalid article data",
  INVALID_ARTICLE_ID: "Invalid article ID for deletion",
};

// Routes
export const ROUTES = {
  HOME: "/",
  SAVED_ARTICLES: "/saved-articles",
};

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  JWT: "jwt",
};
