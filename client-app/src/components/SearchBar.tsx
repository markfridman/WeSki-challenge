import React, { useState } from 'react';
import axios from 'axios';
import destenations from '../consts'
interface SearchFilters {
  destination: number;
  groupSize: number;
  startDate: string;
  endDate: string;
}

// const styles = {

// }

const SearchBar: React.FC<{ onSearch: (results: any[]) => void }> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: 1,
    groupSize: 4,
    startDate: '2025-03-04',
    endDate: '2025-03-11',
  });


  const handleSearch = async () => {
    const apiUrl = 'http://localhost:5000/api/search';
    const requestBody = {
      query: {
        ski_site: filters.destination,
        from_date: filters.startDate,
        to_date: filters.endDate,
        group_size: filters.groupSize,
      },
    };

    try {

      axios({
        url: apiUrl,
        data: requestBody,
        headers: {
          'accept': '*',
          'content-type': 'application/json'
        },
        method: 'POST',
        onDownloadProgress: progressEvent => {
          const xhr = progressEvent.event.target
          const { responseText } = xhr
          console.log("=====responseText======")
          console.log(responseText)
          onSearch(JSON.parse(responseText));
        }
      })
      // const response = await axios.post(apiUrl, requestBody);
      // // const parsedData = response.data.json()
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <h2>Search Hotels</h2>
      <div>
        <label htmlFor="destination">Destination:</label>
        <select name="destination" id="destination" value={filters.destination} onChange={handleInputChange}>
          {destenations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="groupSize">Group Size:</label>
        <input
          type="number"
          name="groupSize"
          id="groupSize"
          min={1}
          max={10}
          value={filters.groupSize}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;