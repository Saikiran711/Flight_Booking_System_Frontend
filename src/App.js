import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearch from './Components/Home/Home';
import FlightList from './Components/FlightList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlightSearch />} />
                <Route path="/flightlist" element={<FlightList />} />
            </Routes>
        </Router>
    );
}

export default App;
