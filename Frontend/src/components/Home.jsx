import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>EmCore Shop System</h1>
    </div>
  );
}

export default Home;
