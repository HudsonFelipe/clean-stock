import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Route, Routes as Router } from 'react-router-dom';
import Home from './pages/Home';
import LauchOverview from './pages/LauchOverview';

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/lauch-overview" element={<LauchOverview />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
