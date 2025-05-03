import './Estimates.css';
import React, { useState } from 'react';

import EntryField from './EntryField';
import { IoSearch } from 'react-icons/io5';

function Estimates() {
  const [partSearch, setPartSearch] = useState('');
  const [new_PartNumber, setNewPartNumber] = useState('');
  const [new_CompanyID, setNewCompanyID] = useState('');
  const [new_partDesc, setNewPartDesc] = useState('');
  const [new_Qty, setNewQty] = useState('');
  const [new_price, setNewPrice] = useState('');

  const Search = async (e) => {
    alert(`searching for ${partSearch}`);
    e.preventDefault(); // prevent page reload
    try {
      const query = encodeURIComponent(partSearch);
      const response = await fetch(
        `http://localhost:5050/estimates?partSearch=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        alert('found it');
      } else {
        alert('doesnt exist');
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
        <button onClick={Search}>
          <IoSearch className="search_icon" />
        </button>
      </div>

      <div className="addEstimate">
        <h2 className="addEstimateBanner">Add New Estimate Below</h2>

        <form onSubmit={AddPart}>
          <EntryField label="Part Number" />

          <EntryField label="Company ID" />

          <EntryField label="Part Description" />

          <EntryField label="QTY" />

          <EntryField label="Price" />
        </form>
      </div>
    </>
  );
}

export default Estimates;
