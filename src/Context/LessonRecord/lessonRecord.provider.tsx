import React, { ReactNode, useState } from "react";
import { LessonRecordContext } from "./lessonRecord.context";
import { LessonData } from '../../Pages/Dashboard/dashboard.model'

const LessonRecordProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [lessonRecord, updateLessonRecord] = useState<LessonData[]>([]);

    return (
        <LessonRecordContext.Provider value={[lessonRecord, updateLessonRecord]}>
            {children}
        </LessonRecordContext.Provider>
    )
}


export default LessonRecordProvider;