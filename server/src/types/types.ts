export interface Query {
  ski_site: number;
  from_date: string;
  to_date: string;
  group_size: number;
}

export interface RequestBody {
  query: Query;
}

export interface HotelData {
  id: string;
  name: string;
  price: number;
  // Add other properties as needed
}