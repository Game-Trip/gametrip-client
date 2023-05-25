export default interface ListGameDto {
	idGame: string;
	name: string;
	description: string;
	editor: string;
	//timestamp
	releaseDate: number;
	author: string;
	isValidate: boolean;
}
