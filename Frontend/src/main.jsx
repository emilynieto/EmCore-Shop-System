import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // This is critical for routing to work
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  //strict mode is a wrapper component that checks for problems during development
  //browser router enables navigation using browsers url
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
