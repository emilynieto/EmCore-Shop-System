import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import EntryField from './EntryField';
import CompanyDropdown from './CompanyDropdown';
import AddCompanyPopup from './AddCompanyPopup';
import './CreateWorkOrder.css';

function CreateWorkOrder() {
  const navigate = useNavigate();

  // Auto-generated Work Order ID
  const [workOrderID, setWorkOrderID] = useState('');

  // Form fields
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [date, setDate] = useState('');
  const [selectedCompanyID, setSelectedCompanyID] = useState('');

  // Table content rows
  const [contentRows, setContentRows] = useState([
    {
      id: 1,
      qty: '',
      partNumber: '',
      price: '',
      blank: '',
      description: '',
      dueDate: '',
    },
  ]);

  // Popup states
  const [isCompanyPopupOpen, setIsCompanyPopupOpen] = useState(false);
  const [isPartSearchOpen, setIsPartSearchOpen] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [partSearchQuery, setPartSearchQuery] = useState('');
  const [partSearchResults, setPartSearchResults] = useState([]);

  // Generate Work Order ID on component mount
  useEffect(() => {
    generateWorkOrderID();
  }, []);

  // Handle company selection
  const handleSelectCompany = (companyID) => {
    setSelectedCompanyID(companyID);
  };

  const handleAddNewCompany = () => {
    setIsCompanyPopupOpen(true);
  };

  const closeCompanyPopup = () => {
    setIsCompanyPopupOpen(false);
  };

  // Handle content table operations
  const addNewRow = () => {
    const newRow = {
      id: contentRows.length + 1,
      qty: '',
      partNumber: '',
      price: '',
      description: '',
      dueDate: '',
    };
    setContentRows([...contentRows, newRow]);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = contentRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setContentRows(updatedRows);
  };

  const deleteRow = (index) => {
    if (contentRows.length > 1) {
      const updatedRows = contentRows.filter((_, i) => i !== index);
      setContentRows(updatedRows);
    }
  };

  // Part search functionality
  const openPartSearch = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setIsPartSearchOpen(true);
    setPartSearchQuery('');
    setPartSearchResults([]);
  };

  const closePartSearch = () => {
    setIsPartSearchOpen(false);
    setCurrentRowIndex(null);
    setPartSearchQuery('');
    setPartSearchResults([]);
  };

  const searchParts = async () => {
    if (!partSearchQuery.trim()) return;

    try {
      const query = encodeURIComponent(partSearchQuery);
      const response = await fetch(
        `http://localhost:5050/estimates?partNo=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        setPartSearchResults(data);
      } else {
        setPartSearchResults([]);
        alert('No parts found');
      }
    } catch (error) {
      console.error('Error searching parts:', error);
      alert('Error searching parts');
    }
  };

  const selectPart = (part) => {
    if (currentRowIndex !== null) {
      updateRow(currentRowIndex, 'partNumber', part.PartNumber);
      updateRow(currentRowIndex, 'description', part.partDesc);
      closePartSearch();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workOrderData = {
      workOrderID,
      purchaseOrder,
      date,
      companyID: selectedCompanyID,
      content: contentRows.filter(
        (row) =>
          row.qty ||
          row.partNumber ||
          row.price ||
          row.description ||
          row.dueDate
      ),
    };

    try {
      // Here you would typically send the data to your backend
      console.log('Work Order Data:', workOrderData);
      alert('Work Order created successfully!');
      navigate('/workorders');
    } catch (error) {
      console.error('Error creating work order:', error);
      alert('Error creating work order');
    }
  };

  return (
    <div className="create-work-order-container">
      {/* Header */}
      <header className="page-header">
        <h1>Work Order</h1>
        <div className="nav-buttons">
          <button
            className="nav-button home-button"
            onClick={() => navigate('/Home')}
            title="Home"
          >
            <FaHome />
          </button>
          <button
            className="nav-button back-button"
            onClick={() => navigate(-1)}
            title="Back"
          >
            <FaArrowLeft />
          </button>
        </div>
      </header>

      <div className="main-content">
        {/* Left Side - Form Fields */}
        <div className="left-section">
          <div className="form-section">
            <div className="order-id-display">
              <label>Order ID:</label>
              <span className="order-id">{workOrderID}</span>
            </div>

            <EntryField
              label="Purchase Order"
              placeholder="Enter PO number"
              value={purchaseOrder}
              onChange={(e) => setPurchaseOrder(e.target.value)}
            />

            <EntryField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <CompanyDropdown
              label="Company"
              selectedCompanyID={selectedCompanyID}
              onSelectCompany={handleSelectCompany}
              onAddNewCompany={handleAddNewCompany}
            />

            <button className="submit-button" onClick={handleSubmit}>
              Create Work Order
            </button>
          </div>
        </div>

        {/* Right Side - Content Table */}
        <div className="right-section">
          <div className="content-section">
            <h2>Content</h2>
            <div className="table-container">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>QTY</th>
                    <th>Part Number</th>
                    <th>Price(EA)</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentRows.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) =>
                            updateRow(index, 'qty', e.target.value)
                          }
                          placeholder="Qty"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.partNumber}
                          onClick={() => openPartSearch(index)}
                          onChange={(e) =>
                            updateRow(index, 'partNumber', e.target.value)
                          }
                          placeholder="Click to search"
                          className="part-number-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={row.price}
                          onChange={(e) =>
                            updateRow(index, 'price', e.target.value)
                          }
                          placeholder="Price"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.blank}
                          onChange={(e) =>
                            updateRow(index, 'blank', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) =>
                            updateRow(index, 'description', e.target.value)
                          }
                          placeholder="Description"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={row.dueDate}
                          onChange={(e) =>
                            updateRow(index, 'dueDate', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="delete-row-button"
                          onClick={() => deleteRow(index)}
                          disabled={contentRows.length === 1}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-row-button" onClick={addNewRow}>
                + Add Row
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Popup */}
      {isCompanyPopupOpen && <AddCompanyPopup onClose={closeCompanyPopup} />}

      {/* Part Search Popup */}
      {isPartSearchOpen && (
        <div className="popup-overlay">
          <div className="part-search-popup">
            <div className="popup-header">
              <h3>Search Part Number</h3>
              <button className="close-button" onClick={closePartSearch}>
                <FaTimes />
              </button>
            </div>
            <div className="search-section">
              <div className="search-input-container">
                <input
                  type="text"
                  value={partSearchQuery}
                  onChange={(e) => setPartSearchQuery(e.target.value)}
                  placeholder="Enter part number"
                  className="search-input"
                />
                <button className="search-button" onClick={searchParts}>
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="search-results">
              {partSearchResults.length > 0 ? (
                <div className="results-list">
                  {partSearchResults.map((part, index) => (
                    <div
                      key={index}
                      className="result-item"
                      onClick={() => selectPart(part)}
                    >
                      <div className="part-number">{part.PartNumber}</div>
                      <div className="part-description">{part.partDesc}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  {partSearchQuery
                    ? 'No parts found'
                    : 'Enter a part number to search'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateWorkOrder;
