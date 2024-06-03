import { Series } from "../models/ISeries";


export const listSeriesDataBackend: Series[] = [
    {
        id: "1",
        category: ["Miedo", "Drama", "Terror"],
        seasons: [
            {
                id: "1",
                title: "The Walking Dead - T1",
                img: "assets/imgs/the-walking-dead-primera-temporada-original.jpg",
                trailerVideo: "assets/videos/series/Trailer The Walking Dead Temporada 1 Español Latino HD.mp4",
                description: "Al despertar en un hospital totalmente vacío después de pasar varias semanas en coma, el alguacil del condado Rick Grimes (Andrew Lincoln) se encuentra completamente solo. El Mundo tal como él lo conocía se ha terminado, azotado por una epidemia zombie.",
                numberEpisodes: 8,
                date: new Date("2024-08-11"),
                rating: 9.1,
                videos: [
                    {
                        id: "1",
                        title: "Los días transcurridos",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/series/Trailer The Walking Dead Temporada 1 Español Latino HD.mp4",
                        description: "Rick busca a su familia después de salir del coma en un mundo plagado de muertos vivientes. Por el camino conoce a Morgan y Duane quienes enseñan a Rick las nuevas normas para la supervivencia."
                    },
                    {
                        id: "2",
                        title: "Tripas",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
                        description: "Rick accidentalmente hace que un grupo de supervivientes sean encontrados por los no muertos. Mientras tanto, el grupo emplea la violencia y se acusan entre ellos mientras Rick se enfrenta a un enemigo más peligroso que los zombis."
                    },
                    {
                        id: "3",
                        title: "Díselo a las ranas",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Después de regresar al campamento con los supervivientes del supermercado y un reencuentro emocional con su esposa e hijo, Rick decide ir en contra del consejo de Shane y volver a Atlanta a por Merle Dixon y su bolsa de armas perdida,acompañados por el hermano menor de Merle, Darryl Dixon, así como de Glenn y T-Dog"
                    },
                    {
                        id: "4",
                        title: "Chicos",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/series/Trailer The Walking Dead Temporada 1 Español Latino HD.mp4",
                        description: "La misión de Rick en Atlanta se ve comprometida cuando la situación se tuerce. Jim se desquicia en el campamento."
                    },
                    {
                        id: "5",
                        title: "Fuego forestal",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
                        description: "Tras el ataque, Rick dirige al grupo hasta el Centro de Control de Enfermedades. Jim tiene que tomar una difícil decisión sobre un asunto de vida o muerte."
                    },
                    {
                        id: "6",
                        title: "Ts-19",
                        img: "assets/imgs/capitulo-1.jpg",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Un extraño médico permite a Rick y sus compañeros entrar en el Centro de Control de Enfermedades. Pero en su nuevo refugio no todo es lo que parece."
                    },
                ]
            },
            {
                id: "2",
                trailerVideo: "assets/videos/series/THE WALKING DEAD TRAILER SEGUNDA TEMPORADA SUB ESPAÑOL HD.mp4",
                img: "assets/imgs/temporada2-the-walking-dead.jpg",
                date: new Date("2024-08-11"),
                rating: 9.5,
                description: "Durante la segunda temporada de esta lúgubre serie de zombis, Grimes y sus cohortes continúan la búsqueda del santuario en un paraje desolado y peligroso.",
                title: "The Walking Dead - T2",
                numberEpisodes: 11,
                videos: [
                    {
                        id: "1",
                        title: "Lo que queda por delante",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/series/THE WALKING DEAD TRAILER SEGUNDA TEMPORADA SUB ESPAÑOL HD.mp4",
                        description: "Rick dirige al grupo fuera de Atlanta. En la autopista, se ven involucrados en un inesperado atasco en el que surgirán amenazas desconocidas para ellos hasta el momento. Un miembro del grupo desaparecerá y el resto hará lo posible por encontrarlo."
                    },
                    {
                        id: "2",
                        title: "Sangría",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
                        description: "Buscando ayuda, Rick conseguirá encontrar un lugar aparentemente seguro. Shane, por su parte, se tendrá que enrolar en una misión de alto riesgo para conseguir unas medicinas en una cuestión de vida o muerte."
                    },
                    {
                        id: "3",
                        title: "Guarda la última",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "El grupo sigue esperando en la granja la vuelta de Shane en su búsqueda por las ansiadas medicinas. Por su parte, la vida del resto del grupo está marcada por la reciente desaparición que aún no se ha resuelto y, comienzan las tensiones dentro del grupo sobre el modus operandi para convivir con los habitantes de la granja."
                    },
                    {
                        id: "4",
                        title: "Rosa Cherokee",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/series/Trailer The Walking Dead Temporada 1 Español Latino HD.mp4",
                        description: "Shane realiza un sacrificio bastante juzgable para sacar su misión adelante, y en la granja todos siguen preocupados por la desaparición, en concreto Daryl, nos dará una agradable sorpresa al verse más involucrado que nadie en la búsqueda. El resto de supervivientes matan el tiempo en labores comunitarias mientras siguen a la espera de reorganizarse…"
                    },
                    {
                        id: "5",
                        title: "Chupacabra",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Deadpool y Lobezno - Trailer final español.mp4",
                        description: "Las tensiones entre los dueños de la granja y los supervivientes se empiezan a hacer patentes, excepto entre Glenn y Maggie, que la situación se hace un tanto extraña. Daryl, por su parte, mientras efectúa misión de reconocimiento de la zona, se ve envuelto en un viaje introspectivo en el cual se le aparecerán fantasmas del pasado y se reabrirán viejas heridas. Por último, Glenn descubrirá una sorpresa poco agradable en el granero."
                    },
                    {
                        id: "6",
                        title: "Secretos",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Los secretos que últimamente goteaban por el campamento, comienzan a salir a la luz, haciendo que la tensión crezca. Hersel se niega a afrontar la realidad del mundo más allá de la granja, y Andrea, por su parte, está al borde del colapso… El grupo empieza a sufrir el sobre estrés del nuevo orden mundial."
                    },
                    {
                        id: "7",
                        title: "Prácticamente muertos",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Las tensiones entre Rick y Shane se hacen latentes, y, poco a poco van creando diferentes facciones en el campamento. Glenn desvela el secreto del granero para informar a todo el grupo, y esto acentuará más aun los problemas. Muchas incógnitas de la temporada tendrán su respuesta en este episodio."
                    },
                    {
                        id: "8",
                        title: "Nebraska",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Rick y los demás intentan restaurar el orden tras las secuelas del terrible descubrimiento. Hershel recupera un viejo hábito y desaparece, Rick y Glenn deben seguirle en la ciudad."
                    },
                    {
                        id: "9",
                        title: "El dedo en el gatillo",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Rick, Hersel y Glenn continúan atrapados en el bar y luchan por salvar sus vidas y escapar de sus asaltantes. Shane encuentra a Lori pasando verdaderos peligros y asume la misión de llevarla de vuelta a la granja sana y salva."
                    },
                    {
                        id: "10",
                        title: "Season 2",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "La tensión entre Rick y Shane continuará creciendo cuando deciden que hacer con el prisionero que capturaron en el bar, cuestión que les traerá de cabeza en un entorno industrial que no se parece en absoluto a la apacible y tranquila granja."
                    },
                    {
                        id: "11",
                        title: "Juez, jurado, verdugo",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "Rick y Shane afrontan un mismo problema de formas diferentes, y la conclusión hará que Dale considere si están perdiendo su humanidad. Las acciones de Carl por su parte, tendrán repercusiones inesperadas en el comportamiento de todo el grupo de supervivientes."
                    },
                    {
                        id: "12",
                        title: "Mejores ángeles",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "El grupo se entera de que puede andar suelto alguien peligroso. Cuando cae la noche, Rick, Shane, Daryl y Glenn peinan el bosque para controlar la situación."
                    },
                    {
                        id: "13",
                        title: "Junto al fuego que se extingue",
                        img: "assets/imgs/portada2.webp",
                        video: "assets/videos/Transformers One - Trailer español.mp4",
                        description: "A su regreso, Rick ve que la granja corre peligro. En el caos que se crea, el grupo se divide. Los ánimos están por los suelos y se cuestiona el liderazgo de Rick."
                    },
                ]
            }
        ]
    },

]