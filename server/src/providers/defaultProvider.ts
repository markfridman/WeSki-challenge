import axios from 'axios';
import { Provider } from './provider.interface';
import { ApiResponse, Accommodation } from '../apiModels';
import { Query, RequestBody } from '../types/types';

const API_URL = 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';

export class DefaultProvider implements Provider {
  async fetchHotelData(query: Query): Promise<Accommodation[]> {
    const requestBody: RequestBody = { query };

    const response = await axios.post<ApiResponse>(API_URL, requestBody);
    return response.data.body.accommodations;
  }
}