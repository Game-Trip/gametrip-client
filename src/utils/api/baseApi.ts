
import * as apiClient from "@game-trip/ts-api-client";
import { ServerConfiguration } from "@game-trip/ts-api-client";


const config = apiClient.createConfiguration({
  baseServer: new ServerConfiguration<{}>(
    "https://staging-api.game-trip.fr",
    {}
  )
});

export const AnnonymAuthController = new apiClient.AuthApi(config);
export const AnnonymCommentController = new apiClient.CommentApi(config);
export const AnnonymGameController = new apiClient.GameApi(config);
export const AnnonymLikeController = new apiClient.LikeApi(config);
export const AnnonymLocationController = new apiClient.LocationApi(config);
export const AnnonymPictureController = new apiClient.PictureApi(config);
export const AnnonymSearchController = new apiClient.SearchApi(config);
export const AnnonymStatusController = new apiClient.StatusApi(config);
export const AnnonymUserController = new apiClient.UserApi(config);
export const AnnonymValidationController = new apiClient.ValidationApi(config);