import './style.css';
import DailyLesson from '../DailyLesson';
import { LessonData } from '../../../Dashboard/dashboard.model';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { monthNames } from '../../record.utils';



const MonthDay: React.FC<{dayOfMonth:string}> = ({dayOfMonth}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ isDailyVisible, updateIsDailyVisible] = useState<boolean>(false);

    return (
        lessonRecord.filter((l:LessonData) => l.date === dayOfMonth).length === 0
        ?
        <></>
        :
        (
        <main className='individual-day__container'>
            <section className='monthday-qty__container'>
                <div className='day-lesson-title' onClick={() => updateIsDailyVisible(!isDailyVisible)}>
                    Clases {dayOfMonth.split('-')[0]} de {monthNames[Number(dayOfMonth.split('-')[1])-1]}
                </div>
                <div className='day-lessons-qty'>
                    {lessonRecord.filter((l:LessonData) => l.date === dayOfMonth).length}
                </div>
            </section>
            <section className='lesson-list__container'>
                {lessonRecord.map((l:LessonData) => l.date === dayOfMonth && (
                    <DailyLesson key={l.id} dailyLesson={l} isDailyVisible={isDailyVisible}></DailyLesson>))}
            </section>    
        </main>
        )
    )
}


export default MonthDay