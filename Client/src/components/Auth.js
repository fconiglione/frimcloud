import React, { useState, useEffect } from "react";
import axios from "axios";

function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const apiUrl = process.env.NODE_ENV === 'development' ? 
                       process.env.REACT_APP_DEV_API_URL : 
                       process.env.REACT_APP_PROD_API_URL;
    
    useEffect(() => {
        const authenticate = async () => {
            try {
                const user_id = sessionStorage.getItem('user_id');
                const token = sessionStorage.getItem('token');
                if (!user_id || !token) {
                    setIsAuthenticated(false);
                    throw new Error("User ID or token not found");
                }
                
                const response = await axios.post(apiUrl + '/users/verify', { user_id, token }, { withCredentials: true });
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    throw new Error("Unauthorized");
                }
            } catch (error) {
                setErrorMessage("Authentication error. Please try again.");
                console.log("Authentication error:", error);
                window.location.href = "/login";
            }
        };

        authenticate();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated;
}

export default Auth;