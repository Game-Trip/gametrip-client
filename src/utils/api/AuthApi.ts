import BaseApi from './baseApi';
import { LoginDto } from '../Models/Authentication/LoginDto';
import { ConfirmMailDto } from '../Models/Authentication/ConfirmMailDto';
import { ForgotPasswordDto } from '../Models/Authentication/ForgotPasswordDto';
import { ResetPasswordDto } from '../Models/Authentication/ResetPasswordDto';
import { RegisterDto } from '../Models/Authentication/RegisterDto';

export class RegisterApi {
	static async registerUser(registerDto: RegisterDto) {
		return await BaseApi.AppAnonymous.post(`/Auth/Register`, registerDto);
	}

	static async loginUser(loginDto: LoginDto) {
		return await BaseApi.AppAnonymous.post(`/Auth/Login`, loginDto);
	}

	static async confirmEmail(confirmMailDto: ConfirmMailDto) {
		return await BaseApi.AppAnonymous.post(
			`/Auth/ConfirmEmail`,
			confirmMailDto,
		);
	}

	static async forgotPassword(forgotDto: ForgotPasswordDto) {
		return await BaseApi.AppAnonymous.post(`/Auth/ForgotPassword`, forgotDto);
	}

	static async resetPassword(resetPasswordDTo: ResetPasswordDto) {
		return await BaseApi.AppAnonymous.post(
			`/Auth/ResetPassword`,
			resetPasswordDTo,
		);
	}
}
