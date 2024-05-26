export interface HotelImage {
  URL: string;
  MainImage?: boolean;
}

export interface HotelDistance {
  type: string;
  distance: string;
}

export interface HotelPosition {
  Latitude: string;
  Longitude: string;
  Distances: HotelDistance[];
}

export interface HotelInfo {
  Position: HotelPosition;
  Rating: string;
  Beds: string;
}

export interface HotelPricesInfo {
  AmountAfterTax: string;
  AmountBeforeTax: string;
}

export interface HotelDescriptiveContent {
  Images: HotelImage[];
}

export interface Accommodation {
  HotelCode: string;
  HotelName: string;
  HotelDescriptiveContent: HotelDescriptiveContent;
  HotelInfo: HotelInfo;
  PricesInfo: HotelPricesInfo;
}

export interface ApiResponse {
  statusCode: number;
  body: {
    success: string;
    accommodations: Accommodation[];
  };
}