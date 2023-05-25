import LocationNameDto from './LocationNameDto';

export default interface ListLikedLocationDto {
	likedLocationId: string;
	locationId: string;

	location: LocationNameDto;
}
