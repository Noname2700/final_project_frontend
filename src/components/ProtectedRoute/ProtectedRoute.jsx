import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { ROUTES } from "../../utils/constants.js";
import Preloader from "../Preloader/Preloader.jsx";
import "./ProtectedRoute.css";
function ProtectedRoute({
  isLoggedIn,
  isAuthChecking = false,
  children,
  anonymous = false,
  handleUnauthorized,
}) {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isAuthChecking) {
      return;
    }

    if (!anonymous && !isLoggedIn && handleUnauthorized) {
      handleUnauthorized();

      setTimeout(() => {
        setShouldRedirect(true);
      }, 0);
    }
  }, [isLoggedIn, isAuthChecking, anonymous, handleUnauthorized]);

  if (isAuthChecking) {
    return (
      <div className="protected-route__loading">
        <Preloader message="Verifying authentication..." />
      </div>
    );
  }

  if (anonymous && isLoggedIn) {
    return <Redirect to={ROUTES.SAVED_ARTICLES} />;
  }

  if (!anonymous && !isLoggedIn && shouldRedirect) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return children;
}

export default ProtectedRoute;
