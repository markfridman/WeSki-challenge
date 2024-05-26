import React from 'react';
import Hotel from './Hotel';
import { Accommodation } from '../apiModels'

const HotelList: React.FC<{ hotels: Accommodation[] }> = ({ hotels }) => {
  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#F6F9FE'
    }}>
      <div style={{ width: 900 }}>
        <h2>Select your ski trip</h2>
        {hotels.length ? <div><h4>{hotels.length} ski trips options</h4><h4></h4></div> : ''}
      </div>
      {hotels.map((hotel) => (
        <Hotel key={hotel.HotelCode} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;