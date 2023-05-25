import LocationNameDto from './LocationNameDto';

export default interface LikedLocationDto {
	likedLocationId: string;
	locationId: string;
	userIds: string[];
	nbVotes: number;
	minValue: number;
	maxValue: number;
	averageValue: number;

	location: LocationNameDto;
}
