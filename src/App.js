import React from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './Components/MainNavigation/Root';
import HomePage from './Components/Home/Home';

import About from './Components/Aboutandcontactpage/About';
import Contact from './Components/Aboutandcontactpage/Contact';
import BookingPage from './Components/Booking/BookingPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PrivateRoute from './Components/MainNavigation/PrivateRoute';
import ProfilePage from './Components/Profile/ProfilePage';
import FlightList from './Components/Flights/FlightList';
import TicketPage from './Components/Booking/Ticket';


const router=createBrowserRouter([
    {path:'/',element:<RootLayout />,children:[
        {index:true,element:<HomePage />,},
        {path:'/flightlist',element:<FlightList />},
        {           
            element: <PrivateRoute />,
            children:[
               {path:'/booking', element:<BookingPage />} ,
               {path:'/ticket',element:<TicketPage />}

            ]   
                            
        },
        {path:'/about',element:<About />},
        {path:'/contact',element:<Contact />},
        {path:'/login',element:<Login />},
        {path:'/register',element:<Register />},
        {path:'/profile',element:<ProfilePage />}


    ]},
])

function App() {
    return (
        <>
        <div className="background-container"></div>
            <div className="content">
                {/* Your page content goes here */}
                <RouterProvider router={router} />
            </div>
        
        </>
      
    );
}

export default App;
