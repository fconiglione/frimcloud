import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const Login = () => {
  const { user, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!user) {
      loginWithRedirect();
    }
  }, [user, loginWithRedirect]);

  if (isLoading) {
    return <Loading />;
  }

  return <Loading />;
};

export default Login;