import React, { ReactNode, useState, useEffect } from "react";
import { LessonRecordContext, lessonDataInitialValues } from "./lessonRecord.context";
import { LessonData } from '../../Pages/Dashboard/dashboard.model';
import { sortLessons } from "../../Pages/Dashboard/utils";
import { getLessonsListAPI } from "../../Core/users/users.api";

const LessonRecordProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [lessonRecord, updateLessonRecord] = useState<LessonData[]>([lessonDataInitialValues]);

    useEffect(() => {
        getLessonsListAPI().then(r => {
            //call 'sortLessons function to sort the lesson array in ascending order by date
            const sortedLessonArray = sortLessons(r.lessons);
            updateLessonRecord(sortedLessonArray)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <LessonRecordContext.Provider value={{lessonRecord, updateLessonRecord}}>
            {children}
        </LessonRecordContext.Provider>
    )
}


export default LessonRecordProvider;