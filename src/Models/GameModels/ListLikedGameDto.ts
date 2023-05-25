import GameNameDto from './GameNameDto';

export default interface ListLikedGameDto {
	likedGameId: string;
	gameId: string;

	game: GameNameDto;
}
