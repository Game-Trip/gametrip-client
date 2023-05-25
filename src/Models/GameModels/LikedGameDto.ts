import GameNameDto from './GameNameDto';

export default interface LikedGameDto {
	likedGameId: string;
	gameId: string;
	userIds: string[];
	nbVotes: number;
	minValue: number;
	maxValue: number;
	averageValue: number;

	game: GameNameDto;
}
