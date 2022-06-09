import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Edit from './pages/Edit';
import Consignes from './pages/Consignes';
import MapRender from './pages/MapRender';
//import Map from './pages/Map';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapRender/>} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/consignes" element={<Consignes/>} />
        <Route path="*" element={<MapRender />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;