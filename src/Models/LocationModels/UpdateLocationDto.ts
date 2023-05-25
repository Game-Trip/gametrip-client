export default interface UpdateLocationDto {
	locationId: string;
	name: string;
	description: string;
	//Precision(18,12)
	latitude: number;
	//Precision(18,12)
	longitude: number;
}
