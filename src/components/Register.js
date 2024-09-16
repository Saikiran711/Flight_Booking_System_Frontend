import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [alternativeContactNumber, setAlternativeContactNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password || !phoneNumber || !gender || !address || !alternativeContactNumber) {
            setErrorMessage('All fields are required.');
            return;
        }
    
        const newUser = { name, email, password, phoneNumber, gender, address, alternativeContactNumber };
    
        try {
            const response = await fetch("https://localhost:44339/api/UserLogin/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            if (response.ok) {
                navigate('/login');
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setErrorMessage('Error registering');
            console.error(err);
        }
    };
    
    return (
        <div className="container mt-5">
            <h2>Register</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    required 
                />
            </div>
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
            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    value={phoneNumber} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <select 
                    className="form-control" 
                    onChange={(e) => setGender(e.target.value)} 
                    value={gender} 
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Address</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setAddress(e.target.value)} 
                    value={address} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Alternative Contact Number</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setAlternativeContactNumber(e.target.value)} 
                    value={alternativeContactNumber} 
                    required 
                />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
    );
}
