import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './Components/MainNavigation/Root';
import FlightSearch from './Components/Home/Home';
import FlightList from './Components/FlightList';

import HomePage from './Components/Home/Home';

const router=createBrowserRouter([
    {path:'/',element:<RootLayout />,children:[
        {index:true,element:<HomePage />,}
    ]},
])

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
