export default class Movie {
	name: string;
	genre: string;
	sinopsis: string;
	rate: number;
	director: string;

	constructor( name: string, genre: string, sinopsis: string, rate: number, director: string) {
		this.name = name;
		this.genre = genre;
		this.sinopsis = sinopsis;
		this.rate = rate;
		this.director = director;
	}
}

