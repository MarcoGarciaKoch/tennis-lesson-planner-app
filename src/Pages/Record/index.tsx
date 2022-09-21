import './style.css';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { LessonData } from '../Dashboard/dashboard.model';
import { monthDays } from './record.utils';
import DailyLesson from './Components/DailyLesson';


const Record: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ currentMonth, updateCurrentMonth ] = useState({monthNumber:0, monthName:''});
    const [ isDailyVisible, updateIsDailyVisible] = useState<boolean>(false);

    useEffect( () => {
        const today = new Date();
        const monthNumber = today.getMonth();
        const monthName = today.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        updateCurrentMonth({ monthNumber, monthName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <div className='filters__container'></div>
            <div className='month-ref__container table-style'>{currentMonth.monthName}</div>
            <section className='days__container'>
                {Array.from(Array(monthDays[currentMonth.monthNumber]).keys()).map((day:number, i:number) => (
                    <section className='individual-day__container table-style' key={i} onClick={() => updateIsDailyVisible(!isDailyVisible)}>
                        <div className='monthday-qty__container'>
                            <div>Clases día {day+1} de {currentMonth.monthName.toLowerCase()}</div>
                            <div className='day-lessons-qty'>
                                {lessonRecord.filter((l:LessonData) =>
                                parseInt(l.date.split('-')[1]) === currentMonth.monthNumber + 1 &&
                                parseInt(l.date.split('-')[2]) === day + 1).length}
                            </div>      
                        </div>
                        <div className={isDailyVisible ? 'daily-lesson-visible' : 'daily-lesson__container'}>
                            {lessonRecord.map((l:LessonData) => (
                                parseInt(l.date.split('-')[1]) === currentMonth.monthNumber + 1 &&
                                parseInt(l.date.split('-')[2]) === day + 1
                                ? 
                                <DailyLesson key={l.id} dailyLesson={l}></DailyLesson> 
                                : 
                                '')
                            )}
                        </div>
                    </section>
                ))}
            </section>
        </main>
        <Footer></Footer>
        </>
    )
}


export default Record;