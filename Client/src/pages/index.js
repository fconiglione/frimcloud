import React, {useEffect, useState} from "react";
import ShapesBanner from "../assets/images/shapes-banner.svg";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";
import Auth from "../components/Auth";

function Home() {
    const pageTitle = "Home";
    const [firstName, setFirstName] = useState("");
    const isAuthenticated = Auth();
    const full_name = sessionStorage.getItem('full_name');

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
        if (full_name) {
            const names = full_name.split(" ");
            const first_name = names[0];
            setFirstName(first_name);
        }
    }, [pageTitle, firstName]);
    return (
        isAuthenticated && (
        <main className="home">
            <section className="welcome">
                <div className="welcome-column">
                    <div>
                        <img src={ShapesBanner} alt="A triangle, a square, a circle, and a trapezoid." />
                    </div>
                    <div>
                        <h1>Welcome to Frim Cloud, {firstName}!</h1>
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
                    <a href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
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
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        <a className="quick-app" href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
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
        )
    );
}

export default Home;