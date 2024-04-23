import React, {useEffect} from "react";
import ShapesBanner from "../assets/images/shapes-banner.svg";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";

function Home() {
    const pageTitle = "Home";

    useEffect(() => {
        document.title = `${pageTitle} | Frim Cloud`;
    }, [pageTitle]);
    return (
        <main className="home">
            <section className="welcome">
                <div className="welcome-column">
                    <div>
                        <img src={ShapesBanner} alt="A triangle, a square, a circle, and a trapezoid." />
                    </div>
                    <div>
                        <h1>Welcome to Frim Cloud, Francesco!</h1>
                    </div>
                    <div className="welcome-nav">
                        <a href="/settings">
                            Profile settings
                        </a>
                        <a href="#quick-access">
                            Quick access
                        </a>
                    </div>
                </div>
                <div className="welcome-column">
                    <a href="https://www.ceasar.frim.io">
                        <div>
                            <h2>Revitalize customer relations with Ceasar CRM</h2>
                        </div>
                        <div>
                            <h2>Try Ceasar</h2>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </a>
                </div>
            </section>
            <hr />
            <section className="quick-access" id="quick-access">
                <div className="quick-access-row">
                    <h1>Quick access</h1>
                </div>
                <div className="quick-access-row">
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
                <div className="quick-access-row">
                    <a href="/apps" className="quick-access-nav">
                        <span>See all apps</span>
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </section>
        </main>
    );
}

export default Home;