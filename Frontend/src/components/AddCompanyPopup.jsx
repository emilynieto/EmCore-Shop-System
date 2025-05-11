import './AddCompanyPopup.css';
import { useState } from 'react';
import EntryField from './EntryField';

//create a form refer to estiamte add estimate section

// then return div containers that look like popup refer to chatgpt npm error fix last convo had

function AddCompanyPopup({ onClose }) {
  const [CompanyName, SetCompanyName] = useState('');
  const [address, SetAddress] = useState('');
  const [paymentEmail, SetPaymentEmail] = useState('');
  const [BillTo, SetBillTo] = useState('');
  const [ShipTo, SetShipTo] = useState('');

  const AddCompany = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch('http://localhost:5050/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CompanyName,
          address,
          paymentEmail,
          BillTo,
          ShipTo,
        }),
      });

      if (response.ok) {
        alert('added succesfully');
      } else {
        alert('could not add?');
      }
    } catch (error) {
      console.error('Company creation', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="PopUpBox">
      <div className="PopUpWrapper">
        <h2 className="PopUpTitle">Add New Company Below</h2>
        <form onSubmit={AddCompany}>
          <EntryField
            type="text"
            label="Company Name"
            placeholder="Enter Company Name..."
            value={CompanyName}
            onChange={(e) => SetCompanyName(e.target.value)}
          ></EntryField>
          <EntryField
            type="text"
            label="Address"
            placeholder="Enter Company Address..."
            value={address}
            onChange={(e) => SetAddress(e.target.value)}
          ></EntryField>
          <EntryField
            type="email"
            label="Payment Email"
            placeholder="Enter email to send invoices to..."
            value={paymentEmail}
            onChange={(e) => SetPaymentEmail(e.target.value)}
          ></EntryField>
          <EntryField
            type="text"
            label="Bill To Address"
            placeholder="Enter address to be billed..."
            value={BillTo}
            onChange={(e) => SetBillTo(e.target.value)}
          ></EntryField>
          <EntryField
            type="text"
            label="Ship To Address"
            placeholder="Enter ship to address..."
            value={ShipTo}
            onChange={(e) => SetShipTo(e.target.value)}
          ></EntryField>
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AddCompanyPopup;
