import './style.css';
import DailyLesson from '../DailyLesson';
import { CurrentDate } from '../../record.model';
import { LessonData } from '../../../Dashboard/dashboard.model';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';



const MonthDay: React.FC<{dayOfMonth:number, currentDate:CurrentDate}> = ({dayOfMonth, currentDate}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ isDailyVisible, updateIsDailyVisible] = useState<boolean>(false);

    return (
        <main className='individual-day__container'>
            <section className='monthday-qty__container'>
                <div className='day-lesson-title' onClick={() => updateIsDailyVisible(!isDailyVisible)}>
                    Clases día {dayOfMonth+1} de {currentDate.monthName.toLowerCase()}
                </div>
                <div className='day-lessons-qty'>
                    {lessonRecord.filter((l:LessonData) =>
                    parseInt(l.date.split('-')[1]) === currentDate.monthNumber &&
                    parseInt(l.date.split('-')[0]) === dayOfMonth + 1).length}
                </div>
            </section>
            <section className='lesson-list__container'>
                {lessonRecord.map((l:LessonData) => (
                    parseInt(l.date.split('-')[1]) === currentDate.monthNumber &&
                    parseInt(l.date.split('-')[0]) === dayOfMonth + 1
                    ? 
                    <DailyLesson key={l.id} dailyLesson={l} isDailyVisible={isDailyVisible}></DailyLesson> 
                    : 
                    '')
                )} 
            </section>    
        </main>
    )
}


export default MonthDay