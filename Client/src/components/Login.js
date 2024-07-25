import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const Login = () => {
  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user || !user.sub) {
      try {
        getAccessTokenSilently();
      } catch {
        loginWithRedirect();
      }
    }
  }, [user, loginWithRedirect]);

};

export default Login;
