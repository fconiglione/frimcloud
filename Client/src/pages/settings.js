import React, { useEffect } from 'react';
import Auth from '../components/Auth';

function Settings() {
    const pageTitle = "Settings";
    const isAuthenticated = Auth();
    useEffect(() => {
        document.title = `${pageTitle} | Frim Cloud`;
    }, [pageTitle]);
    return (
        isAuthenticated && (
        <main className="settings">
            <div>This is the settings page.</div>
        </main>
        )
    );
}

export default Settings;