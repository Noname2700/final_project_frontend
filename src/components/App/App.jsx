import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
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
      setErrorMessage("Your session has expired. Please log in again.");
      setActiveModal("login");
      navigate("/");
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, [navigate]);

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
            setErrorMessage("Session expired. Please log in again.");
            setIsLoggedIn(false);
            setUserData({ _id: "", email: "", name: "" });
            setSavedArticles([]);
          } else {
            setErrorMessage(
              "Failed to fetch saved articles. Please try again.",
            );
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
        setSearchError("Failed to fetch news articles. Please try again.");
        setIsLoadingArticles(false);
        console.error(err);
      });
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
      setErrorMessage("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain both letters and numbers",
      );
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
        setErrorMessage(err.message);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain both letters and numbers.",
      );
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
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMessage(err.message);
      });
  };

  const handleSignOut = () => {
    signout()
      .then(() => {
        setIsLoggedIn(false);
        setUserData({ _id: "", email: "", name: "" });
        setSavedArticles([]);
        navigate("/");
      })
      .catch((err) => {
        console.error("Signout error:", err);
        setErrorMessage(err.message);
        setIsLoggedIn(false);
        setUserData({ _id: "", email: "", name: "" });
        setSavedArticles([]);
        navigate("/");
      });
  };

  const handleSavedArticles = (article) => {
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
      .catch((err) => {
        console.error("Failed to save article. Please try again.", err);
        setErrorMessage(err.message);
      });
  };

  const handleDeleteSavedArticle = (articleId) => {
    api
      .deleteArticle(articleId)
      .then(() => {
        setSavedArticles((prevSavedArticles) =>
          prevSavedArticles.filter(
            (item) =>
              item._id !== articleId &&
              item.url !== articleId &&
              item.link !== articleId,
          ),
        );
      })
      .catch((err) => {
        console.error("Failed to delete article. Please try again.", err);
        setErrorMessage(err.message);
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
    <KeyboardProvider>
      <KeyboardListener />
      <Keyboard />

      <div className="page">
        <div
          className={`page__content${isHomePage ? " page__content_type_home" : ""}`}
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
            userData={userData}
            onSignOut={handleSignOut}
            onMenuClick={() => setIsMenuOpen(true)}
          />
          <MobileMenu
            isOpen={isMenuOpen}
            handleCloseClick={() => setIsMenuOpen(false)}
            isLoggedIn={isLoggedIn}
            userData={userData}
            onSignOut={handleSignOut}
            onSignInClick={() => {
              setErrorMessage("");
              setActiveModal("login");
            }}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  SearchForm={SearchForm}
                  onSearch={handleSearch}
                  articles={articles}
                  isLoadingArticles={isLoadingArticles}
                  searchError={searchError}
                  searchKeyword={searchKeyword}
                />
              }
            />
            <Route
              path="/saved-articles"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedArticles
                    userData={userData}
                    savedArticlesCount={savedArticles.length}
                    savedArticles={savedArticles}
                    keywords={[]}
                    onDeleteArticle={handleDeleteSavedArticle}
                    isLoggedIn={isLoggedIn}
                    setActiveModal={setActiveModal}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <main>
          {isHomePage && (
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
          {isHomePage && <AboutAuthor />}
        </main>
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
  );
}

export default App;
