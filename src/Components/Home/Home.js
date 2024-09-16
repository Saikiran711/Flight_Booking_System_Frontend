import React from 'react';

import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate();
    const handleSearch = (flights) => {
        navigate('/FlightList', { state: { flights } });
    };
    //for clarity give below give the book navigate as in rote in app,js it navigate to about page

    return (
        <div>
          
            <div className="container mt-5">
                <h2>Search The Flights</h2>
                <SearchForm onSearch={handleSearch} />
            </div>
        </div>
    );
}
