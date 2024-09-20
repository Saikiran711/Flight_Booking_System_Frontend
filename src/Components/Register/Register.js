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
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
 
    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
    const validatePhoneNumber = (phoneNumber) => /^\d+$/.test(phoneNumber);
    const validateAddress = (address) => address.trim() !== '';
    const validateGender = (gender) => ['Male', 'Female', 'Other'].includes(gender);
 
    const handleRegister = async () => {
        setErrorMessage('');
        setSuccessMessage('');
 
        if (!validateName(name)) {
            setErrorMessage('Name is required and must contain only letters and spaces.');
            return;
        }
 
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email address.');
            return;
        }
 
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 6 characters long, and include one uppercase letter, one lowercase letter, and one number.');
            return;
        }
 
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage('Phone number must contain only numbers.');
            return;
        }
 
        if (!validateGender(gender)) {
            setErrorMessage('Please select a valid gender.');
            return;
        }
 
        if (!validateAddress(address)) {
            setErrorMessage('Address is required.');
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
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
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
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
    );
}