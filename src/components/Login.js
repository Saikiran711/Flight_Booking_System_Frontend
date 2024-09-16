import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const userCredentials = { email, password };
    
        try {
            const response = await axios.post("https://localhost:44339/api/UserLogin/login", userCredentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/HomePage');
            } else {
                setErrorMessage('Login failed. Please check your credentials or Register by clicking below button');
            }
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.response.data.message || 'Login failed. Please try again.');
            } else if (err.request) {
                setErrorMessage('Error logging in. Please check your network connection and try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            console.error('Login error:', err);
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required 
                    />
                </div>
                <div>
                   <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
                <button 
                    className="btn btn-secondary mt-3" 
                    onClick={() => navigate('/Register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
}
