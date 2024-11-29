import { useContext, useState } from 'react';
import './signUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Signup = () => {
    const [currentState, setCurrentState] = useState("Login");
    const { url, setToken ,setShowSignup} = useContext(StoreContext);
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        const newUrl = `${url}/auth/${currentState === 'Login' ? 'login' : 'register'}`;
        setLoading(true);
        try {
            const response = await axios.post(newUrl, data, { withCredentials: true });
            console.log(response.data);
            console.log(response.data.data.accessToken)
            if (response.data.statusCode === 200) {
                const AccessToken = response.data.data.accessToken;
                
                if (currentState === 'Login') {
                    setToken(AccessToken);

                    // Set token as a cookie with expiration of 7 days
                    document.cookie = `token=${AccessToken}; path=/; max-age=${7 * 24 * 60 * 60}`;
                    console.log("Document cookie:", document.cookie);

                    setShowSignup(false); // Close signup modal after login
                } else {
                    setCurrentState("Login"); // Move to Login state after successful registration
                }
            } else {
                alert(response.data.message);
            }
            
           
        } catch (error) {
            console.error("Error during login/signup", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginPop">
              {loading && <Loader />}
            <form onSubmit={onLogin} className="loginPopcon">
                <div className="loginPopTitle">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowSignup(false)} src={assets.crossIcon} alt="Close" />
                </div>
                <div className="loginPopInput">
                    {currentState === "Sign Up" && (
                        <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />
                    )}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="E-mail" required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder="Password" required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="loginPopCondition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login" ? (
                    <p>Create account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default Signup;