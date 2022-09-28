

export interface RegisterUserData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoginUserData {
    email: string;
    password:string;
}

export interface ResendValidationEmail {
    email:string;
}

export interface DisplayedMessage {
    messageOne:string;
    messageTwo:string;
}