import { getUserInfo } from '../Auth';
import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
	private static _appAnonymous: AxiosInstance | null;
	static get AppAnonymous() {
		if (!this._appAnonymous) {
			this._appAnonymous = axios.create({
				baseURL: 'https://staging-api.game-trip.fr',
			});
		}
		return this._appAnonymous;
	}

	private static _appLogged: AxiosInstance | null;
	static get AppLogged() {
		if (!this._appLogged) {
			this._appLogged = axios.create({
				baseURL: 'https://staging-api.game-trip.fr',
				headers: { Authorization: `Bearer ${getUserInfo().token}` },
			});
		}
		return this._appLogged;
	}

	static reset() {
		this._appAnonymous = null;
		this._appLogged = null;
	}
}
