import { useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import { ROUTES } from "../../utils/constants.js";

function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
  handleUnauthorized,
}) {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!anonymous && !isLoggedIn && handleUnauthorized) {
      handleUnauthorized();

      setTimeout(() => {
        setShouldRedirect(true);
      },0);
    }
  }, [isLoggedIn, anonymous, handleUnauthorized]);

 
  if (anonymous && isLoggedIn) {
    return <Redirect to={ROUTES.SAVED_ARTICLES} />;
  }

  if (!anonymous && !isLoggedIn && shouldRedirect) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return children;
}

export default ProtectedRoute;
