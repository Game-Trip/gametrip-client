import axios from 'axios';

const axiosclient = axios.create({
  baseURL: 'https://api.geoapify.com/v1/geocode/',
})
export class geoCodingApi {
  static async getAddressInformation(address: string) {

    const response = await axiosclient.get(`search?text=${encodeURIComponent(address)}&apiKey=790908f4df4d4e4ea54997e6a2e0c126`);
    return response;
  }

}