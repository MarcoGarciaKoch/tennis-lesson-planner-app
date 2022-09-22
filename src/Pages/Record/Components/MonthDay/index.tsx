import './style.css';
import DailyLesson from '../DailyLesson';
import { CurrentMonth } from '../../record.model';
import { LessonData } from '../../../Dashboard/dashboard.model';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';



const MonthDay: React.FC<{day:number, currentMonth:CurrentMonth}> = ({day, currentMonth}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ isDailyVisible, updateIsDailyVisible] = useState<boolean>(false);

    return (
        <main className='individual-day__container'>
            <section className='monthday-qty__container'>
                <div className='day-lesson-title' onClick={() => updateIsDailyVisible(!isDailyVisible)}>
                    Clases día {day+1} de {currentMonth.monthName.toLowerCase()}
                </div>
                <div className='day-lessons-qty'>
                    {lessonRecord.filter((l:LessonData) =>
                    parseInt(l.date.split('-')[1]) === currentMonth.monthNumber + 1 &&
                    parseInt(l.date.split('-')[2]) === day + 1).length}
                </div>
            </section>
            <section className='lesson-list__container'>
                {lessonRecord.map((l:LessonData) => (
                    parseInt(l.date.split('-')[1]) === currentMonth.monthNumber + 1 &&
                    parseInt(l.date.split('-')[2]) === day + 1
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