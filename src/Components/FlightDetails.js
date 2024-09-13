import React from 'react';

const FlightDetails = ({ flight, handleBooking }) => {
    // Function to format stops
    const formatStops = (stops) => {
        return stops.map((stop, index) => (
            <div key={index}>
                <p><strong>Stop {index + 1}:</strong> {stop.airportName} - {new Date(stop.stopDuration).toLocaleTimeString()}</p>
            </div>
        ));
    };

    // Function to format seats
    const formatSeats = (seats) => {
        return seats.map((seat, index) => (
            <div key={index} className="mt-2">
                <p><strong>Class:</strong> {seat.seatClass}</p>
                <p><strong>Position:</strong> {seat.seatPosition}</p>
                <p><strong>Price:</strong> ${seat.price.toFixed(2)}</p>
            </div>
        ));
    };

    return (
        <div className="mt-4">
            <h4>Flight Details</h4>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Departure:</strong> {flight.departureAirport} - {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {flight.arrivalAirport} - {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Stops:</strong></p>
            {formatStops(flight.stops)}
            <p><strong>Baggage Allowance:</strong> {flight.baggageAllowance} kg</p>
            <p><strong>Seats:</strong></p>
            {formatSeats(flight.seats)}
            <button
                className="btn btn-primary"
                onClick={() => handleBooking(flight.flightNumber)}
            >
                Book
            </button>
        </div>
    );
};

export default FlightDetails;

