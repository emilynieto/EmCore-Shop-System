import './CompanyDropdown.css';
import React, { useState, useEffect } from 'react';

function CompanyDropdown() {
  const [companies, setCompanies] = useState([]); //renders the state as an empty array because were going to dealing with a list of values from our database
  useEffect(() => {
    const fetchCompanies = async (e) => {
      try {
        const response = await fetch('http://localhost:5050/companies'); // defaults to get if no method is specified
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('failed to load companies', error);
      }
    };
  });
}

export default CompanyDropdown;
