import React, { useEffect } from 'react';

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

export default Settings;