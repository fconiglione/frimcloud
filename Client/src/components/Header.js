import React, { useRef, useState } from "react";
import appLauncherIcon from "../assets/images/app-launcher-icon.png";
import FrimCloudBlackLogo1 from "../assets/images/frim-cloud-black-logo-1.svg";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";
import axios from "axios";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

function Header() {
    const { logout } = useAuth0();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const overlayRef = useRef(null);

    const openAppLauncher = () => {
        setIsMenuActive(!isMenuActive);

        const overlay = overlayRef.current;
        if (overlay) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    const closeAppLauncher = () => { 
        setIsMenuActive(false);
        const overlay = overlayRef.current;
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }  

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

    const currentYear = new Date().getFullYear();
    return (
        <header>
            <div className="header-container">
                <div className="header-column">
                    <div className="header-item">
                        <button className="header-nav-btn" id="app-launcher-open-btn" onClick={openAppLauncher}>
                            <img src={appLauncherIcon} alt="App launcher icon" />
                        </button>
                    </div>
                </div>
                <div className="header-column">
                    <div className="header-item">
                        <a href="/">
                            <img src={FrimCloudBlackLogo1} alt="Frim Cloud logo" className="header-logo" />
                        </a>
                    </div>
                </div>
                <div className="header-column">
                    <div className="header-item">
                        <a href="javascript:void(0)">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                    </div>
                    <div className="header-item">
                        <a href="javascript:void(0)">
                            <i className="fa-solid fa-user"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className={`app-launcher ${isMenuActive ? 'active' : 'inactive'}`} id="app-launcher" onClick={closeAppLauncher} >
                <div className="app-launcher-container">
                    <div className="app-launcher-top">
                        <div className="app-launcher-header">
                            <div>
                                <button className="header-nav-btn" id="app-launcher-close-btn" onClick={closeAppLauncher}>
                                    <img src={appLauncherIcon} alt="App launcher icon" />
                                </button>
                            </div>
                            <div>
                                <a href="/">
                                    <span>Frim Cloud</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <div className="app-launcher-apps">
                            <div>
                                <h1>Apps</h1>
                            </div>
                            <div className="apps">
                                <div className="app">
                                    <a href="javascript:void(0)" onClick={() => redirectToApp("ceasar")}>
                                        <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                                        <p>Ceasar</p>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <a href="/apps" className="see-all-apps-btn">
                                    <span>See all apps</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <hr class="app-launcher-divider"></hr>
                        <div className="app-launcher-nav">
                            <ul>
                                <li>
                                    <a href="https://www.frim.io/help-center">
                                        <i class="fa-solid fa-question"></i>
                                        <span>Help Center</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/settings">
                                        <i class="fa-solid fa-gear"></i>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <button onClick={() => logout({ logoutParams: { returnTo: "https://www.cloud.frim.io" } })}>
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="app-launcher-bottom">
                        <div className="app-launcher-footer-legal">
                            <p>Copyright © { currentYear } Frim, Inc. All Rights Reserved.<br />
                            Ceasar™ is a product developed and owned by Frim, Inc.</p>
                        </div>
                        <div className="app-launcher-footer-nav">
                            <ul>
                                <li>
                                <a href="https://www.frim.io/privacy-policy">Privacy Policy</a>
                                </li>
                                <span class="bullet">&bull;</span>
                                <li>
                                <a href="https://www.frim.io/terms-of-use">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="overlay" ref={overlayRef} onClick={closeAppLauncher}></div>
        </header>
        )
}

export default withAuthenticationRequired(Header, {
    onRedirecting: () => <Loading />,
  });