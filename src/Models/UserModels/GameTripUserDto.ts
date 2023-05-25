import ListCommentDto from '../CommentModels/ListCommentDto';
import ListLikedGameDto from '../GameModels/ListLikedGameDto';
import ListLikedLocationDto from '../LocationModels/ListLikedLocationDto';

export default interface GameTripUserDto {
	userId: string;
	userName: string;
	email: string;

	comments: ListCommentDto[];
	likedGames: ListLikedGameDto[];
	likedLocations: ListLikedLocationDto[];
}
