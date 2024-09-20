import React from 'react';
import { useLocation } from 'react-router-dom';

export default function TicketPage() {
    const location = useLocation();
    const { bookingId, flight, passengerDetails } = location.state || {};

  

    return (
        <div className="container mt-5">
        
            <div className="card">
                <div className="card-body">
                    <h5>Flight Details:</h5>
                    <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                    <p><strong>Airline:</strong> {flight.airline || 'N/A'}</p>
                    <p><strong>Departure:</strong> {flight.departureAirport || 'N/A'}</p>
                    <p><strong>Arrival:</strong> {flight.arrivalAirport || 'N/A'}</p>
                    <p><strong>Departure Time:</strong> {flight.departureTime || 'N/A'}</p>
                    <p><strong>Arrival Time:</strong> {flight.arrivalTime || 'N/A'}</p>
                    <p><strong>Class:</strong> {flight.classType || 'N/A'}</p>

                    <h5 className="mt-4">Passenger Details:</h5>
                    {Object.entries(passengerDetails).map(([index, passenger], i) => (
                        <div key={i} className="mb-3">
                            <h6>Passenger {i + 1}</h6>
                            <p><strong>Name:</strong> {passenger.firstName} {passenger.lastName}</p>
                            <p><strong>Age:</strong> {passenger.age || 'N/A'}</p>
                            <p><strong>Gender:</strong> {passenger.gender || 'N/A'}</p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
