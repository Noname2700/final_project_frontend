import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [savedArticles, setSavedArticles] = useState([]);

  
  useEffect(() => {
    if (isLoggedIn && userData._id) {
      const userKey = `savedArticles_${userData._id}`;
      const saved = localStorage.getItem(userKey);
      if (saved) {
        setSavedArticles(JSON.parse(saved));
      }
    } else {
      
      setSavedArticles([]);
    }
  }, [isLoggedIn, userData._id]);

  
  useEffect(() => {
    if (isLoggedIn && userData._id) {
      const userKey = `savedArticles_${userData._id}`;
      localStorage.setItem(userKey, JSON.stringify(savedArticles));
    }
  }, [savedArticles, isLoggedIn, userData._id]);

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
        console.log(err);
        setSearchError("Failed to fetch news articles. Please try again.");
        setIsLoadingArticles(false);
        console.error(err);
      });
  };
  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, username }) => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === email) {
        return alert("User already exists with this email");
      }
    }

    const newUser = {
      _id: Date.now().toString(),
      email: email,
      password: password,
      username: username,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setActiveModal("register-success");
  };

  //if (password === confirmPassword) {
  //console.log("Registration data:", { username, email, password });
  // TODO: Implement signup API call when backend is ready
  // signup({ name: username, email, password, avatar: "" })
  //   .then(() => return signin({ email, password }))
  //   .then((res) => {
  //     localStorage.setItem("jwt", res.token);
  //     setUserData({ ...res.user });
  //     setIsLoggedIn(true);
  //     closeActiveModal();
  //     navigate("/");
  //   })
  //   .catch((error) => console.error("Registration failed:", error));

  //else {
  //console.error("Passwords do not match");
  //}

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return console.error("Email and password are required");
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return console.error("No user found. Please register first.");
    }

    const userData = JSON.parse(storedUser);

    if (userData.email === email && userData.password === password) {
      setUserData({
        _id: userData._id,
        email: userData.email,
        name: userData.username,
      });
      setIsLoggedIn(true);
      closeActiveModal();
      navigate("/");
    } else {
      return console.error("Invalid email or password");
    }
  };

  //console.log("Login data:", { email, password });
  // TODO: Implement signin API call when backend is ready
  // signin({ email, password })
  //   .then((res) => {
  //     localStorage.setItem("jwt", res.token);
  //     setUserData({ ...res.user });
  //     setIsLoggedIn(true);
  //     closeActiveModal();
  //     navigate("/");
  //   })
  //   .catch((error) => console.error("Login failed:", error));

  //closeActiveModal();
  //};

  /*const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({ _id: "", email: "", name: "" });
    navigate("/");
  };
*/
  const handleSignOut = () => {
    setSavedArticles([]); 
    setIsLoggedIn(false);
    setUserData({ _id: "", email: "", name: "" });
    navigate("/");
  };

  const handleSavedArticles = (articles) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    const isSaved = savedArticles.some((saved) => saved.url === articles.url);
    if (isSaved) {
      const updatedArticles = savedArticles.filter(
        (saved) => saved.url !== articles.url,
      );
      setSavedArticles(updatedArticles);
      return;
    }
    const articleWithKeyword = { ...articles, keyword: searchKeyword };
    setSavedArticles([...savedArticles, articleWithKeyword]);
  };

  const handleDeleteSavedArticle = (articleUrl) => {
    const updatedArticles = savedArticles.filter(
      (item) => item.url !== articleUrl,
    );
    setSavedArticles(updatedArticles);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  return (
    <KeyboardProvider>
      <KeyboardListener />
      <Keyboard />

      <div className="page">
        <div
          className={`page__content${isHomePage ? " page__content--home" : ""}`}
        >
          <Header
            onSignUpClick={() => setActiveModal("register")}
            onSignInClick={() => setActiveModal("login")}
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
            onSignInClick={() => setActiveModal("login")}
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
        <Footer />

        {activeModal === "register" && (
          <Register
            isOpen={true}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            switchToLogin={handleSwitchToLogin}
          />
        )}

        {activeModal === "login" && (
          <Login
            isOpen={true}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            switchToRegister={handleSwitchToRegister}
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
