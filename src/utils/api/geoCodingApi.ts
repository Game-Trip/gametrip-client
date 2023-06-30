import axios, { AxiosInstance } from 'axios';

const axiosclient = axios.create({
  baseURL: 'https://api.geoapify.com/v1/geocode/',
})

const apiKey = '790908f4df4d4e4ea54997e6a2e0c126';
export class geoCodingApi {
  static async getAddressInformation(address: string) {
    return await axiosclient.get(`search?text=${encodeURIComponent(address)}&apiKey=${apiKey}}`);
  }

  static async getAutoCompleteAddress(query: string) {
    return await axiosclient.get(`autocomplete?text=${query}&apiKey=${apiKey}`);
  }
  
}