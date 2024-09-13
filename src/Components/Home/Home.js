import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Helper function to format date
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
};

export default function HomePage() {
    const [departureAirports, setDepartureAirports] = useState([]);
    const [arrivalAirports, setArrivalAirports] = useState([]);
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [selectedArrival, setSelectedArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [classType, setClassType] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await axios.get('https://localhost:44339/api/Airports');
                setDepartureAirports(response.data);
                setArrivalAirports(response.data);
            } catch (error) {
                setErrorMessage('Error fetching airports data');
                console.error(error);
            }
        };

        fetchAirports();
    }, []);

    const handleSearch = async () => {
        if (!selectedDeparture || !selectedArrival || !departureDate || !classType) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        const formattedDate = formatDate(departureDate);

        const searchParams = new URLSearchParams({
            DepartureAirportName: selectedDeparture,
            ArrivalAirportName: selectedArrival,
            DepartureDate: formattedDate,  // Use formatted date
            ClassType: classType,
            NumberOfPassengers: passengers.toString(),
        });

        try {
            const response = await axios.get('https://localhost:44339/api/Flight/Basicsearch', { params: searchParams });
            const data = response.data;

            if (data.length === 0) {
                setErrorMessage('No flights found.');
            } else {
                setErrorMessage(''); // Clear any previous error message
                navigate('/FlightList', { state: { flights: data } });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('No flights found based on the search criteria.');
            } else {
                setErrorMessage('Error fetching flights.');
            }
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Flight Search</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-row mb-3">
                <div className="form-group col-md-6">
                    <label>Departure Airport</label>
                    <select className="form-control" onChange={(e) => setSelectedDeparture(e.target.value)} value={selectedDeparture} required>
                        <option value="">Select Departure Airport</option>
                        {departureAirports.map((airport, index) => (
                            <option key={index} value={airport.name}>{airport.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Arrival Airport</label>
                    <select className="form-control" onChange={(e) => setSelectedArrival(e.target.value)} value={selectedArrival} required>
                        <option value="">Select Arrival Airport</option>
                        {arrivalAirports.map((airport, index) => (
                            <option key={index} value={airport.name}>{airport.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="form-group col-md-6">
                    <label>Departure Date</label>
                    <input type="date" className="form-control" onChange={(e) => setDepartureDate(e.target.value)} value={departureDate} required />
                </div>
                <div className="form-group col-md-6">
                    <label>Class Type</label>
                    <select className="form-control" onChange={(e) => setClassType(e.target.value)} value={classType} required>
                        <option value="">Select Class</option>
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="form-group col-md-6">
                    <label>Passengers</label>
                    <input type="number" className="form-control" onChange={(e) => setPassengers(e.target.value)} value={passengers} min="1" />
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>Search Flights</button>
        </div>
    );
}
