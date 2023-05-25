export default interface LocationUpdateRequestDto {
	locationId: string;
	//! Tous les champs sont null sauf celui qui est modifié
	name: string;
	description: string;
	//precision(18,12)
	latitude: number;
	//precision(18,12)
	longitude: number;
}
