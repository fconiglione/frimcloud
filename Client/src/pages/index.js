import React, {useEffect} from "react";

function Home() {
    const pageTitle = "Home";

    useEffect(() => {
        document.title = `${pageTitle} | Frim`;
    }, [pageTitle]);
    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>Welcome to Frim! We provide a suite of tools to help you build your startup.</p>
        </div>
    );
}

export default Home;