import { LocationDto } from '../Location/LocationDto';

export declare class SearchedGameDto {
	public id: number;
	public name: string;
	public authorId: string;
	public isValidate: boolean;
	public locations: Array<LocationDto>;
}
