import React, {useEffect, useState} from "react";
import FrimCloudLogo1 from "../assets/images/frim-cloud-black-logo-1.svg";
import CeasarLogo1 from "../assets/images/ceasar-coloured-logo-1.svg";
import axios from "axios";
import Cookies from 'js-cookie';

function Login() {
    const pageTitle = "Login";
    const currentYear = new Date().getFullYear();
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const apiUrl = process.env.NODE_ENV === 'development' ? 
                       process.env.REACT_APP_DEV_API_URL : 
                       process.env.REACT_APP_PROD_API_URL;

        try {
            const response = await axios.post(apiUrl + '/users/login', formData, { withCredentials: true });
            const token = response.data.token;
            const user_id = response.data.user_id;
            const full_name = response.data.full_name;
            const token_id = response.data.token_id;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user_id', user_id);
            sessionStorage.setItem('full_name', full_name);
            sessionStorage.setItem('token_id', token_id);
            process.env.NODE_ENV === 'development' ?
                Cookies.set('token_id', token_id, { expires: 1, path: '/', domain: 'localhost', secure: true, sameSite: 'None' }) :
                Cookies.set('token_id', token_id, { expires: 1, path: '/', domain: '.frim.io', secure: true, sameSite: 'None' });
            setFormData({
                email: "",
                password: ""
            });
            if (response.status === 200) {
                window.location.href = "/";
                return
            }
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
        }
     }

    useEffect(() => {
        document.title = `${pageTitle} | Frim`;
    }, [pageTitle]);
    return (
        <section className="login">
            <div className="login-container">
                <div>
                    <div className="login-title">
                        <div>
                            <img src={FrimCloudLogo1} alt="Frim Cloud logo"/>
                        </div>
                        <div>
                            <h1>Good to see you again</h1>
                        </div>
                    </div>
                </div>
                <div className="login-main">
                    <div className="login-form">
                        <form method="post" onSubmit={handleSubmit}>
                            <fieldset>
                                <label>
                                    Your email
                                </label>
                                <div className="login-input">
                                    <i class="fa-solid fa-user"></i>
                                    <input required name="email" type="email" placeholder="e.g. johndoe@example.com" value={formData.email} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <label>
                                    Your password
                                </label>
                                <div className="login-input">
                                    <i class="fa-solid fa-unlock"></i>
                                    <input required name="password" type="password" placeholder="e.g. frimisthebest1234" value={formData.password} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <button className="submit-btn">Sign in</button>
                        </form>
                        <div className="login-form-nav">
                            <a href="/register">Don't have an account?</a>
                            <a href="/forgot-password">Forgot your password?</a>
                        </div>
                    </div>
                    <div className="login-products">
                        <a className="login-product" href="https://www.frim.io/ceasar" target="_blank">
                            <img src={CeasarLogo1} alt="Ceasar logo"/>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="login-footer">
                        <p>© {currentYear} Frim, Inc.</p>
                    </div>
                </div>
            </div>
            <div className={`error-message ${errorMessage ? 'visible' : ''}`}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>{errorMessage}</span>
            </div>
        </section>
    );
}

export default Login;