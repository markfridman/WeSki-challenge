import { ApiResponse, Accommodation } from '../apiModels';
import { Query } from '../types/types';

export interface Provider {
  fetchHotelData(query: Query): Promise<Accommodation[]>;
}