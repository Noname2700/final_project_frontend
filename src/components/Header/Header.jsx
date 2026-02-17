import "./Header.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Logout from "../../assets/icons/logout.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  onSignInClick,
  isLoggedIn,
  onSignOut,
  onMenuClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h2 className="header__title">NewsExplorer</h2>
      <nav className="header__buttons">
        <NavLink exact to="/" className="header__homebutton">
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink exact to="/saved-articles" className="header__savedarticlesbutton">
            Saved Articles
          </NavLink>
        )}
        {isLoggedIn ? (
          <button className="header__usernamebutton" onClick={onSignOut}>
            {currentUser.name || currentUser.username || currentUser.email}
            <img src={Logout} alt="Logout" className="header__logout-icon" />
          </button>
        ) : (
          <button className="header__signinbutton" onClick={onSignInClick}>
            Sign In
          </button>
        )}
      </nav>

      <button className="header__menu-btn" onClick={onMenuClick} type="button">
        <span className="header__menu-line"></span>
        <span className="header__menu-line"></span>
      </button>
    </header>
  );
}
export default Header;
