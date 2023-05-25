import LocationNameDto from '../LocationModels/LocationNameDto';
import ListPictureDto from '../Picture/ListPictureDto';
import ListLikedGameDto from './ListLikedGameDto';

export default interface GameDto {
	name: string;
	description: string;
	editor: string;
	//Timestamp
	releaseDate: number;
	isValidate: boolean;

	locations: LocationNameDto[];
	pictures: ListPictureDto[];
	likedGames: ListLikedGameDto[];
}
