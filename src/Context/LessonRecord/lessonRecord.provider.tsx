import React, { ReactNode, useState, useEffect } from "react";
import { LessonRecordContext, lessonDataInitialValues } from "./lessonRecord.context";
import { LessonData } from '../../Pages/Dashboard/dashboard.model';
import { sortLessons } from "../../Pages/Dashboard/utils";
import { useUsers } from "../../Core/users/users.hook";

const LessonRecordProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [lessonRecord, updateLessonRecord] = useState<LessonData[]>([lessonDataInitialValues]);
    const { getUserData } = useUsers();

    useEffect(() => {
        getUserData().then((r:{_name:string, _lastname:string, lessons:LessonData[]}) => {
            //call 'sortLessons function to sort the lesson array in ascending order by date
            const sortedLessonArray = sortLessons(r.lessons);
            updateLessonRecord(sortedLessonArray);
        })
    },[getUserData, lessonRecord])

    return (
        <LessonRecordContext.Provider value={{lessonRecord, updateLessonRecord}}>
            {children}
        </LessonRecordContext.Provider>
    )
}


export default LessonRecordProvider;