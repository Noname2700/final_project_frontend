import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (anonymous && isLoggedIn) {
    const redirectTo = isHomePage ? "/articles" : "/";
    return <Navigate to={redirectTo} replace />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
