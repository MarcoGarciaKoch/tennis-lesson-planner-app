import { useState } from "react";
import { registerAPI, validateTokenAPI, loginAPI } from "./auth.api";
import { RegisterUserData, LoginUserData } from "./auth.model";
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

    const register = async (user: RegisterUserData ) => {
        updateIsLoading(true); // loading mode on
        await registerAPI(user); // Call API register function
        updateIsLoading(false); // When API call finishes, loading mode off
    }


    const validate = async (token:string) => {
        updateIsLoading(true); // loading mode on
        const res = await validateTokenAPI(token); // Call API validateTokenAPI function
        updateIsLoading(false); // When API call finishes, loading mode off
        res.ok ? updateAccountValidated(true) : updateAccountValidated(false); // To know what message to show on validation
    }


    const login = async (user: LoginUserData) => {
        updateIsLoading(true); // loading mode on
        const token = await loginAPI(user); // Call API login function
        updateIsAuth(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, token.access_token);
        updateIsLoading(false); // When API call finishes, loading mode off
     }


    return {
        isAuth,
        isLoading,
        accountValidated,
        register,
        validate,
        login
    }
}