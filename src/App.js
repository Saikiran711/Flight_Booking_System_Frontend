import React from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './Components/MainNavigation/Root';
import HomePage from './Components/Home/Home';
import FlightList from './Components/FlightList';
import About from './Components/Aboutandcontactpage/About';
import Contact from './Components/Aboutandcontactpage/Contact';
import BookingPage from './Components/Home/BookingPage';



const router=createBrowserRouter([
    {path:'/',element:<RootLayout />,children:[
        {index:true,element:<HomePage />,},
        {path:'/flightlist',element:<FlightList />},
        {path:'/BookingPage',element:<BookingPage/>},
        {path:'/about',element:<About />},
        {path:'/contact',element:<Contact />},
        {path:'/login',element:<About />},


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
