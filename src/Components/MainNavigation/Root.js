import {Outlet} from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
export default function RootLayout(){
    return(<>
    <Navbar />
    <main>
        <Outlet />
    </main>
    </>
    );
 }