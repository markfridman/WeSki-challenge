import React from 'react';
import Hotel from './Hotel';
import { Accommodation } from '../apiModels'

const HotelList: React.FC<{ hotels: Accommodation[] }> = ({ hotels }) => {
  console.log({ hotels })
  return (
    <div>
      <h2>Hotel Results</h2>
      {hotels.map((hotel) => (
        <Hotel key={hotel.HotelCode} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;