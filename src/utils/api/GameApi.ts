import BaseApi from './baseApi';

export class GameApi {
	static async getAllGames(limit: number | null) {
		if (limit) return await BaseApi.AppAnonymous.get(`/Game?limit=${limit}`);
		else return await BaseApi.AppAnonymous.get(`/Game`);
	}
}
