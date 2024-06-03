export type Categories = "Accion" | "Comedia" | "Fantasia" | "Miedo" | "Drama" | "Terror" | "ALL" ;

export interface Movie {
    id: string;
    title: string;
    description: string;
    category: Categories[];
    rating: number;
    date: Date;
    image: string; 
    trailerVideo: string;
    video: string;
}

export enum NameCategories {
    comedy = "comedia",
    action = "accion",
    fantasy = "fantasia",
    terror = "terror"
}

export enum NameTypes {
    series = "SERIES",
    movies = "PELICULAS"
}

export enum BasesUrls {
    movies = "http://127.0.0.1:8000/movies",
    series = "http://127.0.0.1:8000"
}

export interface TypeObject {
    series: boolean;
    movies: boolean;
}

