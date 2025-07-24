import { DefaultContext } from 'react-icons/lib';
import './WorkOrders.css';
import React, { useState } from 'react';

function WorkOrders() {
  const [searchWO, setSearchWO] = useState('');
  const [PurchaseOrder, setPartSearch] = useState('');
  const [Date, setDate] = useState('');
  const [CompanyID, setCompanyID] = useState('');

  const Search = async (e) => {
    e.preventDefault(); //prevents page from reloading
    /*
      //code inside of the try block might throw an error this is used for error handling
      try {
          const query = encodeURIComponent(searchWO); //encodeURIComponent() is used to encode special characters in the search query making it safe for use in URL
          const response = await fetch(
            `http://localhost:5050/workorders?woNo=${query}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
    }
    */
  };
}

export default WorkOrders;
