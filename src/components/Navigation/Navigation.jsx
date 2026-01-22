import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/saved-news">Saved Articles</Link>
    </nav>
  );
}

export default Navigation;
