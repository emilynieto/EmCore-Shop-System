import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6'; // Import the right arrow icon from react icons
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate(); //create a navigate function with useNavigate

  return (
    <div className="home-container">
      <h1 className="home-title">EmCore Shop System</h1>
      <div>
        {/* Buttons are given onclick handler to detect when clicked and trigger the navigate function to send us to the appropriate page. 
        Arrow function is used, () means no input is expected once the button is clicked, => is a function that executes whatever is after. 
        You cant just put onClick={navigate('/estimates') because onClick expects to be given a function which is an input and result. so if you just give a result you will be automatically rerouted}
        */}
        <button className="home-buttons" onClick={() => navigate('/estimates')}>
          Estimates
        </button>
        <FaArrowRightLong className="arrow-icon"></FaArrowRightLong>
        {/* add in arrows in between the buttons */}
        <button
          className="home-buttons"
          onClick={() => navigate('/workorders')}
        >
          Work Orders
        </button>
        <FaArrowRightLong className="arrow-icon"></FaArrowRightLong>
        <button
          className="home-buttons"
          onClick={() => navigate('/packinglists')}
        >
          Packing Lists
        </button>
        <FaArrowRightLong className="arrow-icon"></FaArrowRightLong>
        <button className="home-buttons" onClick={() => navigate('/invoices')}>
          Invoices
        </button>
      </div>
    </div>
  );
}

export default Home;
