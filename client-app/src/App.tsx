import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import HotelList from './components/HotelList';

const App: React.FC = () => {
  const [hotelResults, setHotelResults] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setHotelResults(results);
  };

  return (
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HotelList hotels={hotelResults} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;