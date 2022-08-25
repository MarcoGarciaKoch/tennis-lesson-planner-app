

export const AUTH_STORAGE_KEY = 'auth_token';

export const wrapUsingAuth = (options: RequestInit ={}) => {
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${sessionStorage.getItem(AUTH_STORAGE_KEY)}`
    }
    return options;
}


export const getRegistrationMessage = (status:number) => {
    switch (status) {
        case 201:
            return {
                messageOne:'We have sent you an email to validate your account.',
                messageTwo:'Please check your mailbox.'
            }
        case 404:
            return {
                messageOne:'There is no user registered with this email account.',
                messageTwo:'Please complete the registration process first.'
            }
        case 409:
            return {
                messageOne:'There is already a user registered with this email account',
                messageTwo:'Please go to Login page to start using the app.'
            }
        case 500:
            return {
                messageOne:'There was an error and we can not process your petition',
                messageTwo:'Please try again later.'
            }
        default:
            break;
    }
}


export const getLoginMessage = (status:number) => {
    switch (status) {
        case 404:
            return {
                messageOne:'The user email or password provided are not valid.',
                messageTwo:'Please try with a different one.'
            }
        case 500:
            return {
                messageOne:'There was an error and we can not process your petition',
                messageTwo:'Please try again later.'
            }
        default:
            break;
    }
}