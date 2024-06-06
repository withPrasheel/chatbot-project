import React, { useState } from 'react';
import axios from 'axios';
import '../Landing.css';
import { useNavigate } from 'react-router-dom';
import { useChat } from './Context';  // Import the useChat hook

const Landing = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', password: '', email: '' });
    const { setUser } = useChat();

    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let res;
        try {
            res = await axios.post(process.env.REACT_APP_DEV_LINK + 'auth/signin', loginData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', loginData.username);
                setUser({ username: loginData.username });
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert('Invalid credentials!');
            } else {
                alert(error.response.data.message);
                console.error('Error during login:', error);
            }
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_DEV_LINK + 'auth/signup', signupData, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Sign-up successful! Please check your email for verification.');
            setIsSignup(false);
            console.log('Signup successful:', res.data);
        } catch (error) {
            alert('Error during signup:', error);
        }
    };

    return (
        <div className="landing-container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={loginData.username}
                        onChange={handleLoginChange}
                        required
                        className="form-control mb-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        className="form-control mb-2"
                    />
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <p className="mt-3">
                    Don't have an account? <button onClick={() => setIsSignup(true)} className="btn btn-link">Sign Up</button>
                </p>
            </div>
            {isSignup && (
                <div className="signup-popup">
                    <div className="signup-container">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                                required
                                className="form-control mb-2"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                required
                                className="form-control mb-2"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                required
                                className="form-control mb-2"
                            />
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </form>
                        <button className="btn btn-secondary btn-block mt-2" onClick={() => setIsSignup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
