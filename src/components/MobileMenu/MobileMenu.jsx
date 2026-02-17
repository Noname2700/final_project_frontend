import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useModalClose } from "../../hooks/useModalClose.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  handleCloseClick,
  isLoggedIn,
  onSignOut,
  onSignInClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleSignInClick = () => {
    if (onSignInClick) {
      onSignInClick();
    }
  };

  const handleSignOut = () => {
    handleCloseClick();
    if (onSignOut) {
      onSignOut();
    }
  };

  useModalClose(isOpen, handleCloseClick);

  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
      <div className="mobile-menu__content">
        <div className="mobile-menu__header">
          <button
            onClick={handleCloseClick}
            type="button"
            className="modal__close"
          ></button>
          <p className="mobile-menu__title">NewsExplorer</p>
        </div>
        <nav className="mobile-menu__nav">
          <NavLink
            exact
            to="/"
            className="mobile-menu__link"
            onClick={handleCloseClick}
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              exact
              to="/saved-articles"
              className="mobile-menu__link"
              onClick={handleCloseClick}
            >
              Saved Articles
            </NavLink>
          )}

          {isLoggedIn ? (
            <button
              className="mobile-menu__username-btn"
              onClick={handleSignOut}
            >
              {currentUser.name || currentUser.username || currentUser.email}
            </button>
          ) : (
            <button
              className="mobile-menu__signin-btn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
      <p className="mobile-menu__text">Personal account.</p>
    </div>
  );
}

export default MobileMenu;
