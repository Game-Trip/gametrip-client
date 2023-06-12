import * as apiClient from '@game-trip/ts-api-client';
import { ServerConfiguration } from '@game-trip/ts-api-client';

const config = apiClient.createConfiguration({
	baseServer: new ServerConfiguration<{}>(
		'https://staging-api.game-trip.fr',
		{},
	),
});

export const AuthController = new apiClient.AuthApi(config);
export const CommentController = new apiClient.CommentApi(config);
export const GameController = new apiClient.GameApi(config);
export const LikeController = new apiClient.LikeApi(config);
export const LocationController = new apiClient.LocationApi(config);
export const PictureController = new apiClient.PictureApi(config);
export const SearchController = new apiClient.SearchApi(config);
export const StatusController = new apiClient.StatusApi(config);
export const UserController = new apiClient.UserApi(config);
export const ValidationController = new apiClient.ValidationApi(config);
