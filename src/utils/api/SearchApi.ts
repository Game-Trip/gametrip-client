import BaseApi from './baseApi';

export class SearchApi {
	static async searchGames(
		name: string,
		description: string,
		editor: string,
		releaseDate: string,
	) {
		const response = await BaseApi.AppLogged.get(
			`/Search/SearchGame?Name=${name}&Description=${description}&Editor=${editor}&ReleaseDate=${releaseDate}`,
		);
		return response.data;
	}
	static async searchGamesByName(name: string) {
		const response = await BaseApi.AppLogged.get(
			`/Search/SearchGame?Name=${name}`,
		);
		return response.data;
	}
}
