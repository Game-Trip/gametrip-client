import { AuthUser } from './Models/Authentication/AuthUser';
import { LoginDto } from './Models/Authentication/LoginDto';
import { Token } from './Models/Authentication/Token';
import { RegisterApi } from './api/AuthApi';
import api from './api/baseApi';
import { JsonConvert } from 'json2typescript';
import jwtDecode from 'jwt-decode';

export interface IAuthState {
	token: string | null;
	expire: string;
	user: AuthUser | null;
}

const setToken = (token: string): void => {
	localStorage.setItem('Auth-Token', token);
};

const setExpiration = (expireTime: number): void => {
	const dateExpire: string = expireTime.toString();
	localStorage.setItem('token-expire', dateExpire);
};

const getTokenExpirationDate = (encodedToken: Token) => {
	const token: Token = jwtDecode(encodedToken as unknown as string);
	if (!token.exp) {
		return null;
	}

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	return date;
};

const isTokenExpired = (encodedToken: Token): boolean => {
	const token: Token = jwtDecode(encodedToken as unknown as string);
	if (!token || !token.exp) {
		return true;
	}

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	// eslint-disable-next-line
	return date! < new Date();
};

export const resetToken = (): void => {
	localStorage.removeItem('Auth-Token');
	localStorage.removeItem('token-expire');
};

export const getUserInfo = (): any => {
	const token = jwtDecode(getToken()! as unknown as string);
	if (token != null) return token;
};

export const login = (userInfo: LoginDto): Promise<any> => {
	return new Promise((resolve, reject) => {
		RegisterApi.loginUser(userInfo)
			.then(resp => {
				const token: string = resp.data.token;

				setToken(token);
				const tokenDecode: AuthUser = jwtDecode(token);
				console.log(tokenDecode);

				setExpiration(tokenDecode.exp);
				resolve(resp);
			})
			.catch(err => {
				resetToken();
				let errorMessage =
					"Impossible de se connecter au serveur d'authentification";
				if (err.response && err.response.status === 400) {
					errorMessage = err.response.data.Message;
				}
				reject(errorMessage);
			});
	});
};

const getToken = (): Token | null => {
	return localStorage.getItem('Auth-Token') as unknown as Token;
};
const getDecodedToken = (): AuthUser | null => {
	const token = localStorage.getItem('Auth-Token') as unknown as string;

	if (!token) return null;
	return jwtDecode(token);
};

export const isLoggedIn = (): boolean => {
	const token = getToken();

	if (!!token && !isTokenExpired(token)) {
		return true;
	} else return false;
};

export const isAdmin = (): boolean => {
	const token = getDecodedToken();
	if (!token && (token! as AuthUser).Roles.includes('Admin')) {
		return true;
	} else return false;
};
export const isConfirmedUser = (): boolean => {
	const token = getDecodedToken();
	if (token && token!.Roles?.includes('User')) {
		return true;
	} else return false;
};

export const logout = () => {
	resetToken();
	api.reset();
};
