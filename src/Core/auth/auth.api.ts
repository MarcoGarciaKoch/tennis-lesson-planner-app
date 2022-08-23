import { RegisterUserData, ResendValidationEmail, LoginUserData } from "./auth.model";


const generateAuthPostRequest = (user:RegisterUserData | LoginUserData) => (
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    }
)


/**
 * Given a user (name, lastname, email and password)
 */
 export const registerAPI = async (user: RegisterUserData) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, generateAuthPostRequest(user));
}

export const resendValidationEmailAPI = async (user: ResendValidationEmail) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/resendEmail?email=${user.email}`,);
}

export const validateTokenAPI = async (token: string) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/validate?token=${token}`);
}

export const loginAPI = async (user: LoginUserData) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, generateAuthPostRequest(user));
    let token = {access_token: ''};
    if(r.status === 201) token = await r.json();
    return { serverRes: r, token};
}