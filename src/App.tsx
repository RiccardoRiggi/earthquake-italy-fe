import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import CoordinatePage from './pages/CoordinatePage';
import FiltriPage from './pages/FiltriPage';

import HomePage from './pages/HomePage';






function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filtri" element={<FiltriPage />} />
          <Route path="/coordinate" element={<CoordinatePage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
