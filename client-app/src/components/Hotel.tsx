import React from 'react';
import { Accommodation } from '../apiModels'
const Hotel: React.FC<{ hotel: Accommodation }> = ({ hotel }) => {
  return (
    <div>
      <h3>{hotel.HotelName}</h3>
      <p>Price: ${hotel.PricesInfo.AmountAfterTax}</p>
      <img src={hotel.HotelDescriptiveContent.Images.filter((i) => i.MainImage)[0].URL} alt="" />
    </div>
  );
};

export default Hotel;