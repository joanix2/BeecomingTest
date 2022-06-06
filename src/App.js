import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map';
import Edit from './pages/Edit';
import Consignes from './pages/Consignes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/consignes" element={<Consignes/>} />
        <Route path="*" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;