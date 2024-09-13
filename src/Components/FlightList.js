import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlightDetails from './FlightDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FlightList() {
    const location = useLocation();
    const basicSearchResults = location.state?.flights || []; // Get basic search results from the homepage

    const [flights, setFlights] = useState(basicSearchResults); // Initialize with basic search results
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [airline, setAirline] = useState('');
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [numberOfStops, setNumberOfStops] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Apply optional filters on the basic search results
    const handleFilter = () => {
        let filteredFlights = [...basicSearchResults]; // Always start with basic search results

        // Apply optional filters only if they are provided
        if (minPrice) {
            filteredFlights = filteredFlights.filter(flight => flight.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filteredFlights = filteredFlights.filter(flight => flight.price <= parseFloat(maxPrice));
        }

        if (airline) {
            filteredFlights = filteredFlights.filter(flight => flight.airline.toLowerCase().includes(airline.toLowerCase()));
        }

        if (numberOfStops) {
            // Ensure both stops and input are properly parsed to integers
            filteredFlights = filteredFlights.filter(flight => {
                console.log('Stops in backend:', flight.stops);  // Debugging: check backend data
                console.log('Entered stops:', numberOfStops);    // Debugging: check input value
                return flight.stops === parseInt(numberOfStops, 10);
            });
        }

        // If no flights match the filters, display an error message
        if (filteredFlights.length === 0) {
            setErrorMessage('No flights found with the applied filters.');
        } else {
            setErrorMessage('');
        }

        setFlights(filteredFlights); // Update flights to display filtered results
    };
// View flight details based on flight ID
const viewFlightDetails = async (flightId) => {
    if (!flightId) {
        setErrorMessage('Invalid flight ID');
        return;
    }

    try {
        const response = await axios.get(`https://localhost:44339/api/Flight/${flightId}`);
        setSelectedFlight(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrorMessage('No flights found based on the Filters Applied.');
        } else {
            setErrorMessage('Error Applying Filters.');
        }
        console.error(error);
    }
};



    return (
        <div className="container mt-5">
            <h2>Flight Results</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Optional Filters */}
            <div className="form-row mb-3">
                <div className="form-group col-md-3">
                    <label>Min Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                    />
                </div>
                <div className="form-group col-md-3">
                    <label>Max Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                    />
                </div>
                <div className="form-group col-md-3">
                    <label>Airline</label>
                    <input
                        type="text"
                        className="form-control"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        placeholder="Airline Name"
                    />
                </div>
                <div className="form-group col-md-3">
                    <label>Number of Stops</label>
                    <input
                        type="number"
                        className="form-control"
                        value={numberOfStops}
                        onChange={(e) => setNumberOfStops(e.target.value)}
                        placeholder="Stops"
                    />
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleFilter}>
                Apply Filters
            </button>

            {/* Display the filtered flight results */}
            <div className="mt-4">
                {flights.length > 0 ? (
                    <ul className="list-group">
                        {flights.map((flight, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Flight Number:</strong> {flight.flightNumber} <br />
                                <strong>Depature Airport:</strong>{flight.departureAirport} <br/>
                                <strong>Arrial Airport:</strong> {flight.arrivalAirport}<br/>
                                <strong>Airline:</strong> {flight.airline} <br />
                                <strong>Price:</strong> ${flight.price} <br />
                                <strong>Stops:</strong> {flight.stops}<br/>
                                <button className="btn btn-info" onClick={() => viewFlightDetails(flight.flightNumber)}>Flight Details</button>
                            <button className="btn btn-primary ml-2 " onClick={() => navigate('/BookingPage', { state: { flight } })}>Book</button>
                            </li>
                        ))}
                    </ul>
                    
                ) : (
                    <div>No flights available.</div>
                )}
            </div>
            {selectedFlight && (
                <FlightDetails flight={selectedFlight} handleBooking={(flightId) => navigate('/BookingPage', { state: { flightId } })} />
            )}

        </div>
    );
}
