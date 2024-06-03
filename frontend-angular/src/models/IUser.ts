export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    isAuthenticate: boolean;
}

export interface UserAdmins {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    isAuthenticate: boolean;
    image?: string;
}

export interface UserRegister {
    username: string;
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserPassword {
    passwordNew: string;
    passwordConfirm: string;
    email: string;
}