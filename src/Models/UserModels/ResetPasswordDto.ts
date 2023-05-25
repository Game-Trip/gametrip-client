export default interface ResetPasswordDto {
	email: string;
	password: string;
	confirmPassword: string;
	token: string;
}
