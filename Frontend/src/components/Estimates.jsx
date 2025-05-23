import './Estimates.css';
import React, { useState } from 'react';

import EntryField from './EntryField';
import CompanyDropdown from './CompanyDropdown';
import AddCompanyPopup from './AddCompanyPopup';
import { IoSearch } from 'react-icons/io5';

function Estimates() {
  const [partSearch, setPartSearch] = useState('');
  const [new_PartNumber, setNewPartNumber] = useState('');
  const [new_CompanyID, setNewCompanyID] = useState('');
  const [new_partDesc, setNewPartDesc] = useState('');
  const [new_Qty, setNewQty] = useState('');
  const [new_price, setNewPrice] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // assigns value of new company id to the one selected in the drop down
  const handleSelectCompany = (companyID) => {
    setNewCompanyID(companyID);
  };

  //////////////////////////////need to add refernce object for popup here //////////////////////
  // Handle adding a new company (triggered by clicking "Add new company")
  const handleAddNewCompany = () => {
    // Logic to show a popup or trigger the functionality to add a new company
    setIsPopupOpen(true);
  };

  const Search = async (e) => {
    alert(`searching for ${partSearch}`);
    e.preventDefault(); // prevent page reload
    try {
      const query = encodeURIComponent(partSearch);
      const response = await fetch(
        `http://localhost:5050/estimates?partNo=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        alert('found it');
        const data = await response.json(); // <- GET the actual data
        setSearchResults(data);
        console.log('Results:', data); // <- Replace this with state updates to show results in UI
        alert(`Found ${data.length} matching estimate(s).`);
      } else {
        setSearchResults([]);
        alert('Does not exist');
      }
    } catch (error) {
      console.error('search', error);
      alert('Error connecting to server.');
    }
  };

  const AddPart = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch('http://localhost:5050/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_PartNumber,
          new_CompanyID,
          new_partDesc,
          new_Qty,
          new_price,
        }),
      });

      if (response.ok) {
        alert('added succesfully');
      } else {
        alert('could not add?');
      }
    } catch (error) {
      console.error('Estimate Creation', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <h1 className="title">Estimates </h1>
        <hr></hr>

        <div className="Estimate_search">
          <EntryField
            type="number"
            label="Search Estimates"
            placeholder="Enter search terms..."
            value={partSearch}
            onChange={(e) => setPartSearch(e.target.value)}
          />
          <button className="searchButton" onClick={Search}>
            <IoSearch className="search_icon" />
          </button>
        </div>

        <div className="addEstimate">
          <h2 className="addEstimateBanner">Add New Estimate Below</h2>

          <form onSubmit={AddPart}>
            <EntryField
              label="Part Number"
              type="number"
              value={new_PartNumber}
              onChange={(e) => setNewPartNumber(e.target.value)}
            />

            <CompanyDropdown
              label="Company"
              selectedCompanyID={new_CompanyID}
              onSelectCompany={handleSelectCompany}
              onAddNewCompany={handleAddNewCompany}
            />

            <EntryField
              label="Part Description"
              type="text"
              value={new_partDesc}
              onChange={(e) => setNewPartDesc(e.target.value)}
            />

            <EntryField
              label="QTY"
              type="number"
              value={new_Qty}
              onChange={(e) => setNewQty(e.target.value)}
            />

            <EntryField
              label="Price(USD)"
              type="number"
              value={new_price}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        {isPopupOpen && (
          <AddCompanyPopup onClose={() => setIsPopupOpen(false)} />
        )}

        <div className="resultsContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Estimate ID</th>
                <th>Part Number</th>
                <th>Company ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item) => (
                <tr key={item.EstimateID}>
                  <td>{item.EstimateID}</td>
                  <td>{item.PartNumber}</td>
                  <td>{item.CompanyID}</td>
                  <td>{item.partDesc}</td>
                  <td>{item.Qty}</td>
                  <td>{item.price}</td>
                  <td>{item.DateCreated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Estimates;
