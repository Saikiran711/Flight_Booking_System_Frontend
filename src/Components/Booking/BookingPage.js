import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
export default function BookingPage() {
    const location = useLocation();
    const { flight, passengers } = location.state || {};
    const navigate = useNavigate();
 
    const [passengerDetails, setPassengerDetails] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
   // const [bookingId, setBookingId] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
   
 
    // Initialize passenger details
    useEffect(() => {
        if (passengers > 0) {
            const initialPassengerDetails = {};
            for (let i = 0; i < passengers; i++) {
                initialPassengerDetails[i] = {
                    firstName: '',
                    lastName: '',
                    gender: '',
                    age: '',
                    phoneNumber: '',
                    address: '',
                    alternativeContactNumber: '',
                };
            }
            setPassengerDetails(initialPassengerDetails);
        }
    }, [passengers]);
 
    // Handle input changes for passenger details
    const handleInputChange = (index, field, value) => {
        setPassengerDetails((prevState) => ({
            ...prevState,
            [index]: {
                ...prevState[index],
                [field]: value,
            },
        }));
    };
 
    // Calculate the total price based on the number of passengers and flight price
    const calculateTotalPrice = () => {
        const pricePerPassenger = flight.price || 100; // Default price if not provided
        const total = pricePerPassenger * passengers;
        setTotalPrice(total);
    };
 
    // Handle booking confirmation
    const handleBookingConfirmation = async () => {
        try {
            let userId = localStorage.getItem('userId');
            if (userId) {
                userId = parseInt(userId); // Convert userId to integer
            } else {
                throw new Error("UserId not found.");
            }
            const bookingData = {
           
                flightId: flight.flightNumber,
                //totalPrice: totalPrice,
                passengers: Object.values(passengerDetails),
                isPaid: isPaid,
                userId: userId,
               
            };
            const response = await axios.post('https://localhost:44339/api/Booking/confirm', bookingData);
            const  bookingId  = response.data.bookingId;
           
            alert('Booking confirmed successfully!');
            navigate('/ticket', { state: { bookingId, flight, passengerDetails } });
            
        } catch (error) {
            console.error('Error during booking confirmation:', error);
            alert('Failed to confirm the booking.');
        }
    };
 
    // Render the passenger forms dynamically
    const renderPassengerForms = () => {
        const forms = [];
        for (let i = 0; i < passengers; i++) {
            forms.push(
                <div key={i} className="mb-3">
                    <h4>Passenger {i + 1}</h4>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'firstName', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'lastName', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'gender', e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'age', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'phoneNumber', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'address', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Alternative Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(i, 'alternativeContactNumber', e.target.value)}
                        />
                    </div>
                </div>
            );
        }
        return forms;
    };
 
    return (
        <div className="container mt-5">
            <h2>Booking Page</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                calculateTotalPrice();
                handleBookingConfirmation();
            }}>
                {renderPassengerForms()}
                <div className="form-group">
                    <label>Paid:</label>
                    <input
                        type="checkbox"
                        checked={isPaid}
                        onChange={(e) => setIsPaid(e.target.checked)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
            <div className="mt-3">
                <h4>Total Price: {totalPrice}</h4>
            </div>
 
            {/* {bookingId && (
                <div className="mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/ticket', { state: { bookingId, flight, passengerDetails } })}
                    >
                        View Ticket
                    </button>
                </div>
            )} */}
        </div>
    );
}