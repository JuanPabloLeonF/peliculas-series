import { Categories } from "./IMovie";

export interface Series {
    id: string;
    category: Categories[];
    seasons: Seasons[];
}

export interface Seasons {
    id: string;
    title: string;
    img: string;
    videos: Videos[];
    description: string;
    numberEpisodes: number;
    date: Date; 
    rating: number;
    trailerVideo: string;
}

export interface Videos {
    id: string;
    title: string;
    img: string;
    video: string;
    description: string;
}

export interface SeriesSelected {
    category: Categories[];
    season: Seasons;
}