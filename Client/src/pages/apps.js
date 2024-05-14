import React, { useEffect } from "react";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";
import Auth from "../components/Auth";

function Apps() {
    const pageTitle = "Apps";
    const isAuthenticated = Auth();

    const redirectToApp = (app) => {
        const token_id = sessionStorage.getItem('token_id');
    
        if (!token_id) {
            console.log("Token ID not found");
            window.location.href = "/login";
            return;
        }
    
        const url = "https://www." + app + ".frim.io";    
        window.location.href = url;
    }   

    useEffect(() => {
        document.title = `${pageTitle} | Frim Cloud`;
    }, [pageTitle]);
    return (
        isAuthenticated && (
        <main className="apps-page">
            <section className="apps-container">
                <div className="apps-row">
                    <h1>Apps</h1>
                </div>
                <div className="apps-row">
                    <div className="quick-apps">
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                    </div>
                </div>
                <div className="apps-row">
                    <div>
                        <p>Need assistance or have questions? <a href="https://www.frim.io/contact">Contact us</a></p>
                    </div>
                </div>
            </section>
        </main>
        )
    );
}

export default Apps;