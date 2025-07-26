import { useState } from 'react';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Estimates from './components/Estimates';
import WorkOrders from './components/WorkOrders';
import CreateWorkOrder from './components/CreateWorkOrder';
import PackingLists from './components/PackingLists';
import Invoices from './components/Invoices';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/estimates" element={<Estimates />} />
        <Route path="/workorders" element={<WorkOrders />} />
        <Route path="/create-workorder" element={<CreateWorkOrder />} />
        <Route path="/packinglists" element={<PackingLists />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </>
  );
}
export default App;
