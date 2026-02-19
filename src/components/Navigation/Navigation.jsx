import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/saved-articles">Saved Articles</Link>
    </nav>
  );
}

export default Navigation;
