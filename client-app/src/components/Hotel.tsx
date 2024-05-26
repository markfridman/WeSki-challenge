import React from 'react';
import { Accommodation } from '../apiModels'
const Hotel: React.FC<{ hotel: Accommodation }> = ({ hotel }) => {
  return (
    <div style={{
      display: 'flex',
      width: 900,
      borderRadius: 2,
      border: '2px solid #F6F9FE',
      backgroundColor: '#FFFFFF',
      marginBottom: 40,
      height: 200
    }}>
      <div style={{ width: 300, marginRight: 20 }}>
        <img
          style={{
            width: '100%',
            maxWidth: 300
          }}
          src={hotel.HotelDescriptiveContent.Images.filter((i) => i.MainImage)[0].URL || hotel.HotelDescriptiveContent.Images[0].URL}
          alt=""
        />
      </div>
      <div style={{}}>
        <h3>{hotel.HotelName}</h3>
        <div style={{ display: 'flex', borderTop: '2px solid #F6F9FE'}}><h4>{hotel.PricesInfo.AmountAfterTax}</h4><h5>/ Per Person</h5></div>
      </div>
    </div>
  );
};

export default Hotel;