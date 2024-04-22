import React, {useEffect, useState, useRef} from "react";
import FrimCloudLogo1 from "../assets/images/frim-cloud-black-logo-1.svg";
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios";

function Register() {
    const pageTitle = "Get Started";
    const currentYear = new Date().getFullYear();
    const captchaRef = useRef(null) // Src: https://blog.logrocket.com/implement-recaptcha-react-application/
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        receiveUpdates: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = captchaRef.current.getValue();
        const apiUrl = process.env.NODE_ENV === 'development' ? 
                       process.env.REACT_APP_DEV_API_URL : 
                       process.env.REACT_APP_PROD_API_URL;

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(apiUrl + '/register', { token, ...formData }, { withCredentials: true });
            
            captchaRef.current.reset();

            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                receiveUpdates: false,
            });
            if (response.status === 200) {
                window.location.href = 'https://www.cloud.frim.com';
                return;
            }
            else {
                setErrorMessage("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting registration form:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage("User with this email already exists.");
            } else {
                setErrorMessage("Failed to register. Please try again.");
            }
        }
    }

    useEffect(() => {
        document.title = `${pageTitle} | Frim`;
    }, [pageTitle]);
    return (
        <section className="register">
            <div className="register-container">
                <div>
                    <div className="register-title">
                        <div className="register-title-item">
                            <div>
                                <img src={FrimCloudLogo1} alt="Frim Cloud logo"/>
                            </div>
                            <div>
                                <a href="/login">Already have an account?</a>
                            </div>
                        </div>
                        <div>
                            <h1>Create your account</h1>
                        </div>
                    </div>
                </div>
                <div className="register-main">
                    <div className="register-form">
                        <form method="post" onSubmit={handleSubmit}>
                            <fieldset>
                                <label htmlFor="fullName">
                                    Enter your full name
                                </label>
                                <div className="register-input">
                                    <i class="fa-solid fa-signature"></i>
                                    <input required name="fullName" type="name" placeholder="e.g. John Doe" value={formData.fullName} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="email">
                                    Enter your email
                                </label>
                                <div className="register-input">
                                    <i class="fa-solid fa-user"></i>
                                    <input required name="email" type="email" placeholder="e.g. johndoe@example.com" value={formData.email} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password">
                                    Enter your password
                                </label>
                                <div className="register-input">
                                    <i class="fa-solid fa-unlock"></i>
                                    <input required name="password" type="password" placeholder="e.g. frimisthebest1234" value={formData.password} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="confirmPassword">
                                    Confirm your password
                                </label>
                                <div className="register-input">
                                    <i class="fa-solid fa-arrows-rotate"></i>
                                    <input required name="confirmPassword" type="password" placeholder="e.g. frimisthebest1234" value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            </fieldset>
                            {/* <fieldset>
                                <label>
                                    How did you find out about Frim? (Optional)
                                </label>
                                <div className="register-input">
                                    <select>
                                        <option value="0">Please, select the first interaction you can remember</option>
                                        <option value="1">Search engine</option>
                                        <option value="2">Social media</option>
                                        <option value="3">Friend or family</option>
                                        <option value="4">Other</option>
                                    </select>
                                </div>
                            </fieldset> */}
                            <fieldset>
                                <div className="register-input register-checkbox">
                                    <checkbox>
                                        <input name="receiveUpdates" type="checkbox" checked={formData.receiveUpdates} onChange={handleCheckboxChange} />
                                        <label htmlFor="receiveUpdates">Receive product updates and special offers</label>
                                    </checkbox>
                                </div>
                            </fieldset>
                            <div className="captcha" style={{transform:"scale(0.85)", transformOrigin:"0 0"}}>
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_SITE_KEY}
                                    ref={captchaRef}
                                    className="custom-recaptcha"
                                    theme="light"
                                />
                            </div>
                            <button className="submit-btn">Create account</button>
                        </form>
                        <div className="register-form-nav">
                            <p>By creating an account, you agree to our <a href="/terms-of-use">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="register-footer">
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

export default Register;