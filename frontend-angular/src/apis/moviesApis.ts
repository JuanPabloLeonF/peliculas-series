import { Movie, Categories } from "../models/IMovie";

export const listMoviesDataBackend: Movie[] = [
  {
    id: "1",
    title: "Deadpool y Wolverine",
    description: "En Marvel Studios 'Deadpool & Wolverine', Wade Wilson se enfrenta a la TVA, lo que lo saca de una vida aparentemente tranquila y da como resultado que Deadpool se desate",
    category: ["Accion" , "Comedia" , "Fantasia" , "Miedo" , "Drama" , "Terror"],
    rating: 9.7,
    date: new Date("2024-08-11"),
    image: "assets/imgs/deadpool-y-lobezno.jpg",
    trailerVideo: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
    video: "assets/videos/Transformers One - Trailer español.mp4"
  },
  {
    id: "2",
    title: "Transformers",
    description: "La esperada historia de cómo los personajes más icónicos del universo Transformers, Orion Pax y D-16, pasaron de ser hermanos de armas a convertirse en enemigos acérrimos, Optimus Prime y Megatron",
    category: ["Accion", "Fantasia"],
    rating: 6.5,
    date: new Date("2023-08-11"),
    image: "assets/imgs/transformers-one.jpg",
    trailerVideo: "assets/videos/Transformers One - Trailer español.mp4",
    video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4"
  },
  {
    id: "3",
    title: "Deadpool y Wolverine",
    description: "En Marvel Studios 'Deadpool & Wolverine', Wade Wilson se enfrenta a la TVA, lo que lo saca de una vida aparentemente tranquila y da como resultado que Deadpool se desate",
    category: ["Terror"],
    rating: 9.7,
    date: new Date("2024-08-11"),
    image: "assets/imgs/deadpool-y-lobezno.jpg",
    trailerVideo: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
    video: "assets/videos/Transformers One - Trailer español.mp4"
  },
  {
    id: "4",
    title: "Transformers",
    description: "La esperada historia de cómo los personajes más icónicos del universo Transformers, Orion Pax y D-16, pasaron de ser hermanos de armas a convertirse en enemigos acérrimos, Optimus Prime y Megatron",
    category: ["Drama"],
    rating: 6.5,
    date: new Date("2023-08-11"),
    image: "assets/imgs/transformers-one.jpg",
    trailerVideo: "assets/videos/Transformers One - Trailer español.mp4",
    video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4"
  }
]

export const listCategoriesMovies: Categories[] = [ "Accion", "Comedia", "Fantasia", "Miedo", "Drama", "Terror"];