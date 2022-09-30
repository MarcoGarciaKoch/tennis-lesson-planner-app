import { LessonData, AlertMessageData } from "../../Pages/Dashboard/dashboard.model";
import { wrapUsingAuth } from "../auth/auth.utils";


const generateUsersRequest = (data:LessonData | AlertMessageData, methodType:string) => (
    
    {
        method: methodType,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
)


export const getUserDataAPI = async () => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/userData`, wrapUsingAuth());
    return await r.json();
}

export const registerNewLessonAPI = async (lesson:LessonData) => {
    const options = generateUsersRequest(lesson, 'POST');
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/newLesson`, wrapUsingAuth(options));
    return await r.json();
}

export const updateLessonAPI = async (lesson:LessonData) => {
    const options = generateUsersRequest(lesson, 'PATCH');
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/updateLesson`, wrapUsingAuth(options));
    return await r.json();
}

export const deleteLessonAPI = async (alertParameters:AlertMessageData) => {
    const options = generateUsersRequest(alertParameters, 'DELETE');
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/deleteLesson`, wrapUsingAuth(options));
    return await r.json();
}