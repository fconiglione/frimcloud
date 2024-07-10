import React, { useEffect } from "react";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

function Apps() {
    const pageTitle = "Apps";

    const redirectToApp = (app) => {    
        const url = "https://www." + app + ".frim.io";    
        window.location.href = url;
    }   

    useEffect(() => {
        document.title = `${pageTitle} | Frim Cloud`;
    }, [pageTitle]);
    return (
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
}

export default withAuthenticationRequired(Apps, {
    onRedirecting: () => <Loading />,
  });