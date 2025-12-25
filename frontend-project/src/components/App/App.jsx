import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import AboutAuthor from "../AboutAuthor/AboutAuthor.jsx";

import Footer from "../Footer/Footer.jsx";
/*
import LoginModal from '../LoginModal/Login.jsx'
import RegisterModal from '../RegisterModal/Register.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import SavedArticles from '../SavedArticles/SavedArticles.jsx'
import { checkToken, handleLogin, handleRegistration, handleLogout } from '../../utils/auth.js'
*/
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
      </div>
      <AboutAuthor />
      <Footer />
    </div>
  );
}

export default App;
