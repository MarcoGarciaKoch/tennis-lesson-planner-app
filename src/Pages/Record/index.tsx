import './style.css';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { monthDays } from './record.utils';
import MonthDay from './Components/MonthDay';
import AlertMessage from '../Dashboard/Components/AlertMessage';
import { CurrentDate, TotalCalcValues } from './record.model'
import { calcHours, calcMoney } from './record.utils';

const Record: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ currentDate, updateCurrentDate ] = useState<CurrentDate>({monthNumber:0, monthName:'', year:0});
    const [ isTotalVisible, updateIsTotalVisible ] = useState<boolean>(false);
    const [ totalValues, updateTotalValues] = useState<TotalCalcValues>({schoolPaidHours:0, schoolPaidMoney:0, schoolNotPaidHours:0,
                                                                        schoolNotPaidMoney:0, privatePaidHours:0, privatePaidMoney:0,
                                                                        privateNotPaidHours: 0, privateNotPaidMoney:0, specialPaidHours:0, 
                                                                        specialPaidMoney:0, specialNotPaidHours:0, specialNotPaidMoney:0})

    useEffect( () => {
        const today = new Date();
        const monthNumber = today.getMonth()+1;
        const monthName = today.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        const year = today.getFullYear();
        updateCurrentDate({ monthNumber, monthName, year });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleCalculations = () => {
        const schoolPaidHours = calcHours(lessonRecord, 'school', 'yes', currentDate.monthNumber, currentDate.year)
        const schoolPaidMoney = calcMoney(lessonRecord, 'school', 'yes', currentDate.monthNumber, currentDate.year)
        const schoolNotPaidHours = calcHours(lessonRecord, 'school', 'no', currentDate.monthNumber, currentDate.year)
        const schoolNotPaidMoney = calcMoney(lessonRecord, 'school', 'no', currentDate.monthNumber, currentDate.year)

        const privatePaidHours = calcHours(lessonRecord, 'private', 'yes', currentDate.monthNumber, currentDate.year)
        const privatePaidMoney = calcMoney(lessonRecord, 'private', 'yes', currentDate.monthNumber, currentDate.year)
        const privateNotPaidHours = calcHours(lessonRecord, 'private', 'no', currentDate.monthNumber, currentDate.year)
        const privateNotPaidMoney = calcMoney(lessonRecord, 'private', 'no', currentDate.monthNumber, currentDate.year)

        const specialPaidHours = calcHours(lessonRecord, 'special', 'yes', currentDate.monthNumber, currentDate.year)
        const specialPaidMoney = calcMoney(lessonRecord, 'special', 'yes', currentDate.monthNumber, currentDate.year)
        const specialNotPaidHours = calcHours(lessonRecord, 'special', 'no', currentDate.monthNumber, currentDate.year)
        const specialNotPaidMoney = calcMoney(lessonRecord, 'special', 'no', currentDate.monthNumber, currentDate.year)
        updateTotalValues({schoolPaidHours, schoolPaidMoney, schoolNotPaidHours, schoolNotPaidMoney,
                            privatePaidHours, privatePaidMoney, privateNotPaidHours, privateNotPaidMoney,
                                specialPaidHours, specialPaidMoney, specialNotPaidHours, specialNotPaidMoney})
    }


    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <div className='filters__container'></div>
            <section className='month-ref__container'>
                <div className='month-title__container'>
                    <span>{currentDate.monthName}</span>
                    <button className='totals-button' onClick={() => updateIsTotalVisible(!isTotalVisible)}>
                        TOTAL MES
                    </button>
                </div>
                <ul className={isTotalVisible ? 'totals__list' : 'totals__list-non-visible'}>
                    <li className='lesson-calcs__list-item'>
                        <h4>Escuela</h4>
                        <div>
                            <p>Horas Pagadas: <span>{`${totalValues.schoolPaidHours} horas  -  ${totalValues.schoolPaidMoney} €`}</span></p>
                            <p>Horas No Pagadas: <span>{`${totalValues.schoolNotPaidHours} horas  -  ${totalValues.schoolNotPaidMoney} €`}</span></p>
                        </div>
                    </li>
                    <li className='lesson-calcs__list-item'>
                        <h4>Particulares</h4>
                        <div>
                            <p>Horas Pagadas: <span>{`${totalValues.privatePaidHours} horas  -  ${totalValues.privatePaidMoney} €`}</span></p>
                            <p>Horas No Pagadas: <span>{`${totalValues.privateNotPaidHours} horas  -  ${totalValues.privateNotPaidMoney} €`}</span></p>
                        </div>
                    </li>
                    <li className='lesson-calcs__list-item'>
                        <h4>Especiales</h4>
                        <div>
                            <p>Horas Pagadas: <span>{`${totalValues.specialPaidHours} horas  -  ${totalValues.specialPaidMoney} €`}</span></p>
                            <p>Horas No Pagadas: <span>{`${totalValues.specialNotPaidHours} horas  -  ${totalValues.specialNotPaidMoney} €`}</span></p>
                        </div>
                    </li>
                    <li className='lesson-calcs__list-item'>
                        <h4>TOTALES</h4>
                        <div>
                            <p>Horas Pagadas: <span>{`${totalValues.schoolPaidHours + totalValues.privatePaidHours + totalValues.specialPaidHours} horas  -  
                                                    ${totalValues.schoolPaidMoney + totalValues.privatePaidMoney + totalValues.specialPaidMoney} €`}
                                                </span></p>
                            <p>Horas No Pagadas: <span>{`${totalValues.schoolNotPaidHours + totalValues.privateNotPaidHours + totalValues.specialNotPaidHours} horas  -  
                                                    ${totalValues.schoolNotPaidMoney + totalValues.privateNotPaidMoney + totalValues.specialNotPaidMoney} €`}
                                                </span></p>
                        </div>
                    </li>
                    <li className='calcs-button__list-item'>
                        <button className='calculations__button' onClick={handleCalculations}>CALCULAR TOTALES</button>
                    </li>
                </ul>
            </section>
            {Array.from(Array(monthDays[currentDate.monthNumber]).keys()).map((dayOfMonth:number, i:number) => (
                <MonthDay key={i} dayOfMonth={dayOfMonth} currentDate={currentDate}></MonthDay>
            ))}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}



export default Record;