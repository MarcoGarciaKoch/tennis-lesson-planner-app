import './style.css';
import { useContext, useMemo } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { DateData } from '../../record.model';
import { handleCalculations } from '../../record.utils';


const MonthTotals: React.FC<{isTotalVisible:boolean, date:DateData, onCreatePDF:(value:boolean) => void}> = ({isTotalVisible, date, onCreatePDF}) => {
    const { lessonRecord } = useContext(LessonRecordContext);

    const monthlyCalculations = useMemo(() => {
        const results = handleCalculations(lessonRecord, date);
        return results
    },[lessonRecord, date])



    return (
        <ul className={isTotalVisible ? 'totals__list' : 'totals__list-non-visible'}>
            <li className='lesson-calcs__list-item'>
                <h4>Escuela</h4>
                <div>
                    <p>Horas Pagadas: <span>{`${monthlyCalculations.schoolPaidHours} horas  -  ${monthlyCalculations.schoolPaidMoney} €`}</span></p>
                    <p>Horas No Pagadas: <span>{`${monthlyCalculations.schoolNotPaidHours} horas  -  ${monthlyCalculations.schoolNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>Particulares</h4>
                <div>
                    <p>Horas Pagadas: <span>{`${monthlyCalculations.privatePaidHours} horas  -  ${monthlyCalculations.privatePaidMoney} €`}</span></p>
                    <p>Horas No Pagadas: <span>{`${monthlyCalculations.privateNotPaidHours} horas  -  ${monthlyCalculations.privateNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>Especiales</h4>
                <div>
                    <p>Horas Pagadas: <span>{`${monthlyCalculations.specialPaidHours} horas  -  ${monthlyCalculations.specialPaidMoney} €`}</span></p>
                    <p>Horas No Pagadas: <span>{`${monthlyCalculations.specialNotPaidHours} horas  -  ${monthlyCalculations.specialNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>TOTALES</h4>
                <div>
                    <p>Horas Pagadas: <span>{`${monthlyCalculations.schoolPaidHours + monthlyCalculations.privatePaidHours + monthlyCalculations.specialPaidHours} horas  -  
                                            ${monthlyCalculations.schoolPaidMoney + monthlyCalculations.privatePaidMoney + monthlyCalculations.specialPaidMoney} €`}
                                        </span></p>
                    <p>Horas No Pagadas: <span>{`${monthlyCalculations.schoolNotPaidHours + monthlyCalculations.privateNotPaidHours + monthlyCalculations.specialNotPaidHours} horas  -  
                                            ${monthlyCalculations.schoolNotPaidMoney + monthlyCalculations.privateNotPaidMoney + monthlyCalculations.specialNotPaidMoney} €`}
                                        </span></p>
                </div>
            </li>
            <li className='calcs-button__list-item'>
                {/* <button className='month-total-button calculations__button' onClick={getMonthCalculations}>CALCULAR TOTALES</button> */}
                <button className='month-total-button pdf-button' onClick={() => onCreatePDF(true)}>Exportar PDF</button>
            </li>
        </ul>
    )
}


export default MonthTotals;