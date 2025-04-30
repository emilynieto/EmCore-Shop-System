import './Estimates.css';
import React, { useState } from 'react';

import EntryField from './EntryField';
import { IoSearch } from 'react-icons/io5';

function Estimates() {
  const [partSearch, setPartSearch] = useState('');

  const Search = () => {
    alert('searching for', { partSearch });
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
