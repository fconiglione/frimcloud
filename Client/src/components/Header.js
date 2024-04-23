import React, { useRef, useState } from "react";
import appLauncherIcon from "../assets/images/app-launcher-icon.png";
import FrimCloudBlackLogo1 from "../assets/images/frim-cloud-black-logo-1.svg";
import CeasarColouredLogo2 from "../assets/images/ceasar-coloured-logo-2.svg";

function Header() {
    const overlayRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const openAppLauncher = () => {
        setIsActive(true);
        if (overlayRef.current) {
            overlayRef.current.style.display = 'block';
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const closeAppLauncher = () => {
        setIsActive(false);
        if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
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
                <div className="header-item">
                    <a href="/">
                    <img className="header-logo" src={FrimCloudBlackLogo1} alt="Ceasar header logo" />
                    </a>
                </div>
                </div>
                <div className="header-column">
                <div className="header-search-bar">
                    <form action="/search" method="get" id="searchForm">
                    <div className="search-controls">
                        <div className="header-search-inner">
                        <button type="submit" id="searchButton">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input type="text" name="q" placeholder="Search for anything..." id="searchInput" />
                        </div>
                        <div>
                        <button type="button" id="clearButton">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
                <div className="header-column header-icon-bar">
                <div>
                    <button className="header-nav-icon-btn">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="header-item">
                    <a className="header-nav-icon" href="/help-center">
                        <i class="fa-solid fa-question"></i>
                    </a>
                </div>
                <div>
                    <a className="header-nav-icon" href="/settings">
                        <i className="fa fa-gear"></i>
                    </a>
                </div>
                <div>
                    <button className="header-nav-icon-btn">
                        <i className="fa fa-bell"></i>
                    </button>
                </div>
                <hr />
                <div>
                    <button className="header-nav-icon-btn">
                        <i className="fa fa-user"></i>
                    </button>
                </div>
                </div>
            </div>
            <div className="app-launcher inactive" id="app-launcher" onClick={closeAppLauncher}>
                <div className="app-launcher-container">
                <div className="app-launcher-top">
                    <div className="app-launcher-header">
                    <div>
                        <button className="header-nav-btn" id="app-launcher-close-btn">
                        <img src={appLauncherIcon} alt="App launcher icon" />
                        </button>
                    </div>
                    <div>
                        <a href="https://www.frim.io/cloud" target="_blank">
                        <span>Frim Cloud</span>
                        <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                    </div>
                    <div className="app-launcher-apps">
                    <div>
                        <h1>Apps</h1>
                    </div>
                    <div className="apps">
                        <div className="app">
                        <a href="#">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        </div>
                        <div className="app">
                        <a href="#">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        </div>
                        <div className="app">
                        <a href="#">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        </div>
                        <div className="app">
                        <a href="#">
                            <img src={CeasarColouredLogo2} alt="Ceasar app icon" />
                            <p>Ceasar</p>
                        </a>
                        </div>
                    </div>
                    <div>
                        <a href="https://www.frim.io/cloud" className="see-all-apps-btn">
                        <span>See all apps</span>
                        <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                    </div>
                    <hr className="app-launcher-divider" />
                    <div className="app-launcher-nav">
                    <ul>
                        <li>
                        <a href="/help-center">
                            <i className="fa fa-question"></i>
                            <span>Help Center</span>
                        </a>
                        </li>
                        <li>
                        <a href="/settings">
                            <i className="fa fa-gear"></i>
                            <span>Settings</span>
                        </a>
                        </li>
                        <li>
                        <a href="/logout">
                            <i className="fa fa-angle-right"></i>
                            <span>Logout</span>
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="app-launcher-bottom">
                    <div className="app-launcher-footer-legal">
                    <p>Copyright © {currentYear} Frim, Inc. All Rights Reserved.<br />
                    Ceasar™ is a product developed and owned by Frim, Inc.</p>
                    </div>
                    <div className="app-launcher-footer-nav">
                    <ul>
                        <li>
                        <a href="https://www.frim.io/privacy-policy">Privacy Policy</a>
                        </li>
                        <span className="bullet">&bull;</span>
                        <li>
                        <a href="https://www.frim.io/terms-of-use">Terms of Use</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            <div id="overlay" onClick={closeAppLauncher}></div>
        </header>
    );
}

export default Header;