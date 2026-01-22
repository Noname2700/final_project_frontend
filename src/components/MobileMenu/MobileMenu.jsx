import React from "react";
import { NavLink } from "react-router-dom";
import { useModalClose } from "../../hooks/useModalClose.js";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  handleCloseClick,
  isLoggedIn,
  userData,
  // onSignOut,
  onSignInClick,
}) {
  const handleSignInClick = () => {
    if (onSignInClick) {
      onSignInClick();
    }
  };

  //new feature for future: sign out on mobile menu
  /*const handleSignOut = () => {
    onClose();
    if (onSignOut) {
      onSignOut();
    }
  };
  */
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
            to="/"
            className="mobile-menu__link"
            onClick={handleCloseClick}
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/saved-articles"
              className="mobile-menu__link"
              onClick={handleCloseClick}
            >
              Saved Articles
            </NavLink>
          )}

          {isLoggedIn ? (
            <NavLink to="/saved-articles">
              <button className="mobile-menu__username-btn">
                {userData.name}
              </button>
            </NavLink>
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
