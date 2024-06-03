import { UserAdmins } from "../models/IUser";

export const listUsersDataBackend: UserAdmins[] = [
    {
        id: "1",
        username: "papo123",
        email: "papo123@gmail.com",
        name: "juan pablo leon fonseca",
        password: "papo1234567",
        admin: true,
        isAuthenticate: false,
        image: "assets/imgs/prueba-admin.webp",
    },
    {
        id: "2",
        username: "pedro123",
        email: "pedro123@gmail.com",
        name: "pedro leon fonseca",
        password: "pedro123",
        admin: false,
        isAuthenticate: false,
    }
]