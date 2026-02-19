import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import ArticlesSection from "../Articles/ArticlesSection.jsx";
import Login from "../LoginModal/LoginModal.jsx";
import Register from "../RegisterModal/RegisterModal.jsx";
import RegisterSuccessfulModal from "../RegisterSuccessfulModal/RegisterSuccessfulModal.jsx";
import AboutAuthor from "../About/AboutAuthor.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { KeyboardProvider } from "../../contexts/KeyboardContext.jsx";
import KeyboardListener from "../KeyboardListener/KeyboardListener.jsx";
import Keyboard from "../Keyboard/Keyboard.jsx";
import "./App.css";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import { getNews } from "../../utils/NewsApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import api from "../../utils/api.js";
import { signup, signin, signout, getCurrentUser } from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import {
  ROUTES,
  ERROR_MESSAGES,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../utils/constants.js";

function App() {
  const location = useLocation();
  const history = useHistory();
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchExecuted, setSearchExecuted] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUserData({
          _id: user._id || user.id || "",
          email: user.email || "",
          name: user.name || user.username || "",
        });
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserData({ _id: "", email: "", name: "" });
      });
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsLoggedIn(false);
      setUserData({ _id: "", email: "", name: "" });
      setSavedArticles([]);
      setErrorMessage(ERROR_MESSAGES.SESSION_EXPIRED);
      setActiveModal("login");
      history.push(ROUTES.HOME);
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, [history]);

  useEffect(() => {
    if (isLoggedIn && userData._id) {
      api
        .getSavedArticles()
        .then((articles) => {
          const normalized = articles.map((a) => ({
            ...a,
            url: a.url || a.link || "",
            urlToImage: a.imageUrl || a.urlToImage || "",
            publishedAt: a.date || a.publishedAt || "",
            description: a.text || a.description || "",
            source: { name: a.source?.name || a.source || "" },
          }));
          setSavedArticles(normalized);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setErrorMessage(ERROR_MESSAGES.SESSION_EXPIRED);
            setIsLoggedIn(false);
            setUserData({ _id: "", email: "", name: "" });
            setSavedArticles([]);
          } else {
            setErrorMessage(ERROR_MESSAGES.FETCH_ARTICLES_FAILED);
            setSavedArticles([]);
          }
        });
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn, userData._id]);

  const handleSearch = (searchQuery) => {
    setIsLoadingArticles(true);
    setSearchError("");
    setSearchKeyword(searchQuery);
    setSearchExecuted(true);

    getNews({ query: searchQuery, sortBy: "publishedAt" })
      .then((data) => {
        setArticles(data.articles);
        setIsLoadingArticles(false);
      })
      .catch((err) => {
        setSearchError(ERROR_MESSAGES.FETCH_NEWS_FAILED);
        setIsLoadingArticles(false);
        console.error(err);
      });
  };

  const handleUnauthorized = () => {
    setActiveModal("login");
  };

  const handleSwitchToLogin = () => {
    setErrorMessage("");
    setActiveModal("login");
  };

  const handleSwitchToRegister = () => {
    setErrorMessage("");
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, username }) => {
    if (!email || !password || !username) {
      setErrorMessage(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_PASSWORD);
      return;
    }

    signup({ email, password, username })
      .then((res) => {
        return getCurrentUser();
      })
      .then((user) => {
        setUserData({
          _id: user._id || user.id || "",
          email: user.email || "",
          name: user.name || user.username || "",
        });
        setIsLoggedIn(true);
        setActiveModal("register-success");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setErrorMessage(ERROR_MESSAGES.REGISTRATION_FAILED);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setErrorMessage(ERROR_MESSAGES.EMAIL_AND_PASSWORD_REQUIRED);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_PASSWORD);
      return;
    }
    signin({ email, password })
      .then((res) => {
        return getCurrentUser();
      })
      .then((user) => {
        setUserData({
          _id: user._id || user.id || "",
          email: user.email || "",
          name: user.name || user.username || "",
        });
        setIsLoggedIn(true);
        setErrorMessage("");
        closeActiveModal();
        history.push(ROUTES.HOME);
      })
      .catch((err) => {
        console.error("Login error:", err);
        console.error("Error response data:", err.response?.data);
        console.error("Error response status:", err.response?.status);

        if (err.response && err.response.status === 401) {
          setErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
        } else if (err.response && err.response.status === 500) {
          setErrorMessage(
            `Server error: ${err.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR}`,
          );
        } else if (err.message && err.message.includes("profile")) {
          setErrorMessage(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
        } else {
          setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
        }
      });
  };

  const handleSignOut = () => {
    signout()
      .then(() => {
        setIsLoggedIn(false);
        setUserData({ _id: "", email: "", name: "" });
        setSavedArticles([]);
        history.push(ROUTES.HOME);
      })
      .catch((err) => {
        console.error("Signout error:", err);

        setIsLoggedIn(false);
        setUserData({ _id: "", email: "", name: "" });
        setSavedArticles([]);
        history.push(ROUTES.HOME);
      });
  };

  const handleSavedArticles = (article) => {
    if (!isLoggedIn) {
      setActiveModal("register");
      return;
    }

    api
      .saveArticle({
        keyword: searchKeyword || "",
        imageUrl: article.urlToImage || article.urlToimage || "",
        url: article.url || article.link || "",
        link: article.url || article.link || "",
        title: article.title || "",
        date: article.publishedAt || article.date || "",
        text: article.description || article.text || "",
        source:
          (article.source && (article.source.name || article.source)) || "",
      })
      .then((savedArticle) => {
        const normalized = {
          ...savedArticle,
          urlToImage: savedArticle.imageUrl,
          publishedAt: savedArticle.date,
          description: savedArticle.text,
          source: { name: savedArticle.source },
        };
        setSavedArticles((prevSavedArticles) => [
          ...prevSavedArticles,
          normalized,
        ]);
      })
      .catch(() => setErrorMessage(ERROR_MESSAGES.SAVE_ARTICLE_FAILED));
  };

  const handleDeleteSavedArticle = (articleId) => {
    console.log("🗑️ Deleting article with ID:", articleId);
    console.log("📝 Current saved articles:", savedArticles);

    const originalSavedArticles = savedArticles;

    setSavedArticles((prevSavedArticles) => {
      const filtered = prevSavedArticles.filter((item) => {
        const itemId = String(item._id || item.id || "");
        const targetId = String(articleId);
        const urlMatch = item.url === articleId || item.link === articleId;

        console.log("🔍 Comparing:", {
          itemId,
          targetId,
          urlMatch,
          item: { _id: item._id, id: item.id, url: item.url, link: item.link },
        });

        const shouldRemove = itemId === targetId || urlMatch;
        return !shouldRemove;
      });
      console.log("📋 Articles after filter:", filtered.length, "remaining");
      return filtered;
    });

    api
      .deleteArticle(articleId)
      .then(() => {
        console.log("✅ Delete API successful");
      })
      .catch((err) => {
        console.error("❌ Delete API failed:", err);
        // Revert the optimistic update
        setSavedArticles(originalSavedArticles);
        setErrorMessage(ERROR_MESSAGES.DELETE_ARTICLE_FAILED);
      });
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    },
    [closeActiveModal],
  );

  useEffect(() => {
    if (!activeModal) return;

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal, handleEscape]);

  return (
    <CurrentUserContext.Provider value={userData}>
      <KeyboardProvider>
        <KeyboardListener />
        <Keyboard />

        <div className="page">
          <div
            className={`page__content${
              location.pathname === "/" ? " page__content_type_home" : ""
            }`}
          >
            <Header
              onSignUpClick={() => {
                setErrorMessage("");
                setActiveModal("register");
              }}
              onSignInClick={() => {
                setErrorMessage("");
                setActiveModal("login");
              }}
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
              onMenuClick={() => setIsMenuOpen(true)}
            />
            <MobileMenu
              isOpen={isMenuOpen}
              handleCloseClick={() => setIsMenuOpen(false)}
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
              onSignInClick={() => {
                setErrorMessage("");
                setActiveModal("login");
              }}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Main
                    SearchForm={SearchForm}
                    onSearch={handleSearch}
                    articles={articles}
                    isLoadingArticles={isLoadingArticles}
                    searchError={searchError}
                    searchKeyword={searchKeyword}
                  />
                )}
              />
              <Route
                exact
                path="/saved-articles"
                render={() => (
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    handleUnauthorized={handleUnauthorized}
                  >
                    <SavedArticles
                      savedArticlesCount={savedArticles.length}
                      savedArticles={savedArticles}
                      keywords={[]}
                      onDeleteArticle={handleDeleteSavedArticle}
                      isLoggedIn={isLoggedIn}
                      setActiveModal={setActiveModal}
                    />
                  </ProtectedRoute>
                )}
              />
            </Switch>
          </div>
          {location.pathname === "/" && (
            <ArticlesSection
              articles={articles}
              isLoadingArticles={isLoadingArticles}
              searchError={searchError}
              searchKeyword={searchKeyword}
              onSaveArticle={handleSavedArticles}
              savedArticles={savedArticles}
              searchExecuted={searchExecuted}
              isLoggedIn={isLoggedIn}
              setActiveModal={setActiveModal}
            />
          )}
          {location.pathname === "/" && <AboutAuthor />}
          <Footer />

          {activeModal === "register" && (
            <Register
              isOpen={true}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              switchToLogin={handleSwitchToLogin}
              errorMessage={errorMessage}
            />
          )}

          {activeModal === "login" && (
            <Login
              isOpen={true}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              switchToRegister={handleSwitchToRegister}
              errorMessage={errorMessage}
            />
          )}

          {activeModal === "register-success" && (
            <RegisterSuccessfulModal
              isOpen={true}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
            />
          )}
        </div>
      </KeyboardProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
