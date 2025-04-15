import { useState } from 'react';
import './EntryField.css';

function EntryField({ label, type = 'text', placeholder, value, onChange }) {
  //label= text above the entry field, type= default text, placeholder=what will appear in the field while waiting reponse, value= user input, onchange attaches function to run when value changes
  return (
    <div className="entry_field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EntryField;
