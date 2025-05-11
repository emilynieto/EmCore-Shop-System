//should be working perfectly
import './CompanyDropdown.css';
import React, { useState, useEffect } from 'react';

function CompanyDropdown({
  label,
  onAddNewCompany, //function that runs when user selects "add new company"
  selectedCompanyID, //ID of the currently selected company
  onSelectCompany, //function thats called when a company is selected
}) {
  const [companies, setCompanies] = useState([]); //renders the state as an empty array because we're going to be dealing with a list of values from our database
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5050/companies'); // defaults to get if no method is specified
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('failed to load companies', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'add_new') {
      onAddNewCompany();
    } else {
      onSelectCompany(selectedValue);
    }
  };

  return (
    <div className="dropDownField">
      <label>{label}</label>

      <select value={selectedCompanyID} onChange={handleChange}>
        <option value="">-- Select a company --</option>
        {companies.map((company) => (
          <option key={company.CompanyID} value={company.CompanyID}>
            {company.CompanyName}
          </option>
        ))}
        <option value="add_new">--Add new company--</option>
      </select>
    </div>
  );
}

export default CompanyDropdown;
