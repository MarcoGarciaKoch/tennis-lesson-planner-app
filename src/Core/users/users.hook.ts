import { LessonData, AlertMessageData } from "../../Pages/Dashboard/dashboard.model"
import { useState } from "react";
import { registerNewLessonAPI, getUserDataAPI, updateLessonAPI, deleteLessonAPI } from "./users.api";



/**
 * In charge of whole lesson management (CRUD)
 *  - It exposes the Users functions to create, read, update and delete lessons
 * 
 * What do I want to return?
 *      - If we are loading or not
 *      - registerNewLesson function 
 *      - getLessons function
 *      - updateLesson function
 *      - deleteLesson function
 */

export const useUsers = () => {
    const [isLoading, updateIsLoading] = useState<boolean>(false);

    const getUserData = async () => {
        updateIsLoading(true); // loading mode on
        const userData = getUserDataAPI();
        updateIsLoading(false); // When API call finishes, loading mode off
        return userData;
    }
    
    const registerNewLesson = async (lesson:LessonData) => {
        updateIsLoading(true); // loading mode on
        const lessons = await registerNewLessonAPI(lesson);
        updateIsLoading(false); // When API call finishes, loading mode off
        return lessons;
    }

    const updateLesson = async (lesson:LessonData) => {
        updateIsLoading(true); // loading mode on
        const lessons = await updateLessonAPI(lesson);
        updateIsLoading(false); // When API call finishes, loading mode off
        return lessons;
    }

    const deleteLesson = async (alertParameters:AlertMessageData) => {
        updateIsLoading(true); // loading mode on
        const lessons = await deleteLessonAPI(alertParameters);
        updateIsLoading(false); // When API call finishes, loading mode off
        return lessons;
    }

    return {
        isLoading,
        getUserData,
        registerNewLesson,
        updateLesson,
        deleteLesson
    }
}