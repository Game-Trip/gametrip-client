export default interface ListLocationDto {
	id: string;
	name: string;
	description: string;
	//precision(18,12)
	latitude: number;
	//precision(18,12)
	longitude: number;
	authorId: string;
	isValidate: boolean;
}
