import { RegisterUserData, LoginUserData } from "./auth.model";


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

export const validateTokenAPI = async (token: string) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/validate?token=${token}`)
}

export const loginAPI = async (user: LoginUserData) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, generateAuthPostRequest(user));
    console.log(r);
    if(!r.ok) throw new Error(r.status.toString());
    return await r.json();
}