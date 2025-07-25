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
  const [searchResults, setSearchResults] = useState([]); //react state hook that manages search results

  // assigns value of new company id to the one selected in the drop down
  const handleSelectCompany = (companyID) => {
    setNewCompanyID(companyID);
  };

  /////need to add reference object for popup here //////
  // Handle adding a new company (triggered by clicking "Add new company")
  const handleAddNewCompany = () => {
    // Logic to show a popup or trigger the functionality to add a new company
    setIsPopupOpen(true);
  };

  const Search = async (e) => {
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
        const data = await response.json(); // <- GET the actual data
        console.log('Results:', data); // <- Replace this with state updates to show results in UI
        setSearchResults(data);
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
    <div className="pageContainer">
      <h1 className="title">Estimates</h1>

      <div className="estimates-layout">
        {/* Left Column - Forms */}
        <div className="forms-column">
          {/* Search Section */}
          <div className="search-section">
            <h2 className="section-title">Search Estimates</h2>
            <form onSubmit={Search} className="Estimate_search">
              <div className="search-input-wrapper">
                <EntryField
                  label="Part Number"
                  placeholder="Enter part number to search"
                  value={partSearch}
                  onChange={(e) => setPartSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="search-btn">
                <IoSearch />
                Search
              </button>
            </form>
          </div>

          {/* Add New Estimate Section */}
          <div className="add-section">
            <h2 className="section-title">Add New Estimate</h2>
            <form onSubmit={AddPart}>
              <EntryField
                label="Part Number"
                placeholder="Enter part number"
                value={new_PartNumber}
                onChange={(e) => setNewPartNumber(e.target.value)}
              />

              <CompanyDropdown onSelectCompany={handleSelectCompany} />
              <button
                type="button"
                onClick={handleAddNewCompany}
                className="btn btn-secondary"
              >
                Add New Company
              </button>

              <EntryField
                label="Part Description"
                placeholder="Enter description"
                value={new_partDesc}
                onChange={(e) => setNewPartDesc(e.target.value)}
              />

              <EntryField
                label="Quantity"
                placeholder="Enter quantity"
                value={new_Qty}
                onChange={(e) => setNewQty(e.target.value)}
              />

              <EntryField
                label="Price"
                placeholder="Enter price"
                value={new_price}
                onChange={(e) => setNewPrice(e.target.value)}
              />

              <button type="submit" className="btn">
                Add Estimate
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="results-column">
          <h2 className="results-header">Search Results</h2>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <div className="result-field">
                    <div className="result-label">Part Number:</div>
                    <div className="result-value">{result.PartNumber}</div>
                  </div>
                  <div className="result-field">
                    <div className="result-label">Description:</div>
                    <div className="result-value">{result.partDesc}</div>
                  </div>
                  <div className="result-field">
                    <div className="result-label">Quantity:</div>
                    <div className="result-value">{result.Qty}</div>
                  </div>
                  <div className="result-field">
                    <div className="result-label">Price:</div>
                    <div className="result-value">${result.price}</div>
                  </div>
                  <div className="result-field">
                    <div className="result-label">Date Created:</div>
                    <div className="result-value">{result.DateCreated}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No results found. Try searching for a part number.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup for adding new company */}
      {isPopupOpen && <AddCompanyPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default Estimates;
