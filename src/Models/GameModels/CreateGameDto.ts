export default interface CreateGameDto {
	name: string;
	description: string;
	editor: string;
	//Timestamp
	releaseDate: number;
	authorId: string;
}
