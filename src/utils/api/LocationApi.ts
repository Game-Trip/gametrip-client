import BaseApi from './baseApi';

export class LocationApi {
	static async getLocationById(locationId: string) {
		return await BaseApi.AppAnonymous.get(`/Location/Id/${locationId}`);
	}
	static async getAllLocations() {
		return await BaseApi.AppAnonymous.get(`/Location`);
	}
}
