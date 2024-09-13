import {Outlet} from 'react-router-dom';
import Mainnavigation from './MainNaviGation';
export default function RootLayout(){
    return(<>
    <Mainnavigation />
    <main>
        <Outlet />
    </main>
    </>
    );
 }