import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './App.css';
import Logo from '../src/assets/text2.png'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the login route after 3 seconds
    const timer = setTimeout(() => {
      navigate("/setpassword",{
        state: { showInstructions: false }, // Pass state here
    }); // Navigate to the login route
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="App">
     <img src={Logo} style={{width: "172.87px",
height: "105px",marginTop:"-100px"

}} className='image'/>
    </div>
  );
}

export default App;
