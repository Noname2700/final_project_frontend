import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h2 className="header__title">NewsExplorer</h2>
      <div className="header__buttons">
        <button className="header__homebutton">Home</button>
        <button className="header__loginbutton">Login</button>
      </div>
    </header>
  );
}
export default Header;
