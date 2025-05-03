import './Estimates.css';
import React, { useState } from 'react';

import EntryField from './EntryField';
import { IoSearch } from 'react-icons/io5';

function Estimates() {
  const [partSearch, setPartSearch] = useState('');

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
    </>
  );
}

export default Estimates;
