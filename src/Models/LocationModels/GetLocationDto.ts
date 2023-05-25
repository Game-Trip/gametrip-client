import ListCommentDto from '../CommentModels/ListCommentDto';
import ListGameDto from '../GameModels/ListGameDto';
import ListPictureDto from '../Picture/ListPictureDto';
import ListLikedLocationDto from './ListLikedLocationDto';

export default interface GetLocationDto {
	id: string;
	name: string;
	description: string;
	latitude: number;
	longitude: number;
	isValidate: boolean;

	pictures: ListPictureDto[];
	games: ListGameDto[];
	comments: ListCommentDto[];
	likedLocations: ListLikedLocationDto[];
}
