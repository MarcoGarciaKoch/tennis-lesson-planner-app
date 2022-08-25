import { createContext } from 'react';
import { LessonData } from '../../Pages/Dashboard/dashboard.model';


export const lessonDataInitialValues = {
    id: '',
    date: '',
    startTime: '',
    finishTime: '',
    rate: '',
    price: '',
    paid: '',
    players: '',
    club: ''
}

export const LessonRecordContext = createContext({ lessonRecord: [lessonDataInitialValues], 
                                                    updateLessonRecord: (lessonRecord:LessonData[]) => {} });