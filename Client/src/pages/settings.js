import React, { useEffect } from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

function Settings() {
    const pageTitle = "Settings";
    useEffect(() => {
        document.title = `${pageTitle} | Frim Cloud`;
    }, [pageTitle]);
    return (
        <main className="settings">
            <div>This is the settings page.</div>
        </main>
        )
}

export default withAuthenticationRequired(Settings, {
    onRedirecting: () => <Loading />,
  });