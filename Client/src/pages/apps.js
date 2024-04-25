import React, { useEffect } from "react";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";

function Apps() {
    const pageTitle = "Apps";
    const isAuthenticated = Auth();
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
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="https://www.ceasar.frim.io">
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