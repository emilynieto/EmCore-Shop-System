import { DefaultContext } from 'react-icons/lib';
import './WorkOrders.css';
import React, { useState } from 'react';
import EntryField from './EntryField';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa'; // Add these icons

function WorkOrders() {
  const navigate = useNavigate();

  const [searchWO, setSearchWO] = useState('');
  const [searchResults, setSearchResults] = useState([]); //react state hook that manages search results

  const Search = async (e) => {
    e.preventDefault(); //prevents page from reloading
    //code inside of the try block might throw an error this is used for error handling
    try {
      const query = encodeURIComponent(searchWO); //encodeURIComponent() is used to encode special characters in the search query making it safe for use in URL
      const response = await fetch(
        `http://localhost:5050/workorder?WorkOrderID=${query}`,
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
  return (
    <div className="workorders-container">
      {/* Header with navigation buttons */}
      <div className="workorders-header">
        <h1 className="workorders-title">Work Orders</h1>

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button
            className="nav-button back-button"
            onClick={() => navigate(-1)}
            title="Go Back"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <button
            className="nav-button home-button"
            onClick={() => navigate('/Home')}
            title="Go to Home"
          >
            <FaHome />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Main content area with two columns */}
      <div className="workorders-main">
        {/* LEFT COLUMN - Search and Create Button */}
        <div className="workorders-left-column">
          <div className="search-section">
            <h2>Search Work Orders</h2>
            <form onSubmit={Search} className="search-form">
              <EntryField
                label="Work Order ID"
                type="text"
                placeholder="Enter Work Order ID..."
                value={searchWO}
                onChange={(e) => setSearchWO(e.target.value)}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {/* Create New Work Order Button */}
          <div className="create-section">
            <button
              className="create-workorder-button"
              onClick={() => navigate('/create-workorder')}
            >
              Create New Work Order
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - Search Results */}
        <div className="workorders-right-column">
          <div className="results-section">
            <h2>Results</h2>
            {searchResults.length > 0 ? (
              <div className="results-container">
                {searchResults.map((workOrder, index) => (
                  <div key={index} className="work-order-card">
                    <p>
                      <strong>Work Order ID:</strong> {workOrder.WorkOrderID}
                    </p>
                    <p>
                      <strong>Estimate ID:</strong> {workOrder.EstimateID}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {workOrder.Qty}
                    </p>
                    <p>
                      <strong>Price:</strong> ${workOrder.Price}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">
                No work orders found. Try searching for a Work Order ID.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrders;
