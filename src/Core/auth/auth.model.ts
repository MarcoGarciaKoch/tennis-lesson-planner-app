

export type RegisterUserData = {
    name: string,
    lastname: string,
    email: string,
    password: string
}

export type LoginUserData = {
    email: string,
    password:string
}

export type ResendValidationEmail = {
    email:string
}

export type DisplayedMessage = {
    messageOne:string,
    messageTwo:string
}