import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

 
export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('authToken');
            const email = localStorage.getItem('userEmail'); // Retrieve email from localStorage
 
            if (!token) {
                setErrorMessage('You need to log in to view this page.');
                navigate('/login');
                return;
            }
 
            if (!email) {
                setErrorMessage('No user email found.');
                return;
            }
 
            try {
                const response = await axios.get("https://localhost:44339/api/UserLogin/UserByEmail", {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Correctly formatted Bearer token
                    },
                    params: {
                        email: email,
                    },
                });
 
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setErrorMessage('Failed to fetch user details.');
                }
            } catch (err) {
                setErrorMessage('Error fetching user details. Please try again.');
                console.error('Error fetching user details:', err);
            }
        };
 
        fetchUserDetails();
    }, [navigate]);
 
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail'); // Clear email from localStorage
        navigate('/'); // Redirect to home page after logout
    };
 
    return (
        <div className="profile-container">
            <div className="profile-content">
                <h2>Profile Details</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {user ? (
                    <div className="profile-info">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{user.email}</td>
                                </tr>
                               
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{user.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{user.address}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="login-prompt">
                        <p>Please log in to see your profile details.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
 