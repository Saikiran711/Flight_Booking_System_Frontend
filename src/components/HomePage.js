// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!authToken) {
//       navigate('/login');
//     }
//   }, [authToken, navigate]);

//   return (
//     <div>
//       <h2>Home Page</h2>
//       <button onClick={() => {
//         localStorage.removeItem('authToken');
//         setAuthToken(null);
//         navigate('/login');
//       }}>Logout</button>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       navigate('/login');
//     } else {
//       setIsLoading(false);
//     }
//   }, [navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Home Page</h2>
//       <button onClick={() => {
//         localStorage.removeItem('authToken');
//         navigate('/login');
//       }}>Logout</button>
//     </div>
//   );
// };
//export default HomePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => {
        localStorage.removeItem('authToken');
        navigate('/login');
      }}>Logout</button>
    </div>
  );
}

export default HomePage;



