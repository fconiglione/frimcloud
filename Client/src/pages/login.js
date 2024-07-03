import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  // Automatically redirect to okta login page
    loginWithRedirect();
};

export default Login;