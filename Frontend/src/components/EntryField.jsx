import { useState } from 'react';

function EntryField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <type
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EntryField;
