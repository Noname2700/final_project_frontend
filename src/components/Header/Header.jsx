import "./Header.css";
import { NavLink } from "react-router-dom";
import Logout from "../../assets/icons/logout.svg";

function Header({
  //onSignInClick,
  onSignUpClick,
  isLoggedIn,
  userData,
  onSignOut,
  onMenuClick,
}) {
  return (
    <header className="header">
      <h2 className="header__title">NewsExplorer</h2>
      <nav className="header__buttons">
        <NavLink to="/" end className="header__homebutton">
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/saved-articles" className="header__savedarticlesbutton">
            Saved Articles
          </NavLink>
        )}
        {isLoggedIn ? (
          <button className="header__usernamebutton" onClick={onSignOut}>
            {userData.name}{" "}
            <img src={Logout} alt="Logout" className="header__logout-icon" />
          </button>
        ) : (
          <button className="header__signupbutton" onClick={onSignUpClick}>
            Sign Up
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
