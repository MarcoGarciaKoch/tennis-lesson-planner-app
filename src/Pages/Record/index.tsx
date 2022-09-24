import './style.css';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { monthDays } from './record.utils';
import MonthDay from './Components/MonthDay';


const Record: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ currentMonth, updateCurrentMonth ] = useState({monthNumber:0, monthName:''});

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
            <div className='month-ref__container'>{currentMonth.monthName}</div>
            {Array.from(Array(monthDays[currentMonth.monthNumber]).keys()).map((dayOfMonth:number, i:number) => (
                <MonthDay key={i} dayOfMonth={dayOfMonth} currentMonth={currentMonth}></MonthDay>
            ))}
        </main>
        <Footer></Footer>
        </>
    )
}


export default Record;