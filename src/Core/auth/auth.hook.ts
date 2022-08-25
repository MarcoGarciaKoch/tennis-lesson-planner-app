import { useState } from "react";
import { registerAPI, resendValidationEmailAPI, validateTokenAPI, loginAPI } from "./auth.api";
import { RegisterUserData, LoginUserData, ResendValidationEmail } from "./auth.model";
import { AUTH_STORAGE_KEY } from "./auth.utils";


/**
 * In charge of whole authentication management
 *  - It exposes the Auth functions
 *  - It exposes both the token and its saving process (JWT)
 * 
 * Waht do I want to return?
 *      - If we are logged in or not
 *      - If we are loading or not
 *      - Register function 
 *      - Login function
 *      - Validate function
 */

export const useAuth = () => {
    const [isAuth, updateIsAuth] = useState(sessionStorage.getItem(AUTH_STORAGE_KEY) !== null);
    const [isLoading, updateIsLoading] = useState<boolean>(false);
    const [accountValidated, updateAccountValidated] = useState<boolean>(false);

    const register = async (user: RegisterUserData) => {
        updateIsLoading(true); // loading mode on
        const result = await registerAPI(user); // Call API register function
        updateIsLoading(false); // When API call finishes, loading mode off
        return result;
    }


    const resendValidationEmail = async (user:ResendValidationEmail) => {
        updateIsLoading(true); // loading mode on
        const result = await resendValidationEmailAPI(user); // Call API resend validation email function
        updateIsLoading(false); // When API call finishes, loading mode off
        return result;
    }


    const validate = async (token:string) => {
        updateIsLoading(true); // loading mode on
        const res = await validateTokenAPI(token); // Call API validateTokenAPI function
        updateIsLoading(false); // When API call finishes, loading mode off
        res.ok ? updateAccountValidated(true) : updateAccountValidated(false); // To know what message to show on validation
    }


    const login = async (user: LoginUserData) => {
        updateIsLoading(true); // loading mode on
        const result = await loginAPI(user); // Call API login function
        updateIsAuth(true);
        if(result.serverRes.status === 201) sessionStorage.setItem(AUTH_STORAGE_KEY, result.token.access_token);
        updateIsLoading(false); // When API call finishes, loading mode off
        return result.serverRes;
     }


    const logout = () => {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }


    return {
        isAuth,
        isLoading,
        accountValidated,
        register,
        resendValidationEmail,
        validate,
        login,
        logout
    }
}