import './style.css';
import { useState, useContext } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { CurrentDate, TotalCalcValues } from '../../record.model';
import { handleCalculations } from '../../record.utils';


const MonthTotals: React.FC<{isTotalVisible:boolean, currentDate:CurrentDate, onCreatePDF:(value:boolean) => void}> = ({isTotalVisible, currentDate, onCreatePDF}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ totalValues, updateTotalValues] = useState<TotalCalcValues>({schoolPaidHours:0, schoolPaidMoney:0, schoolNotPaidHours:0,
        schoolNotPaidMoney:0, privatePaidHours:0, privatePaidMoney:0,
        privateNotPaidHours: 0, privateNotPaidMoney:0, specialPaidHours:0, 
        specialPaidMoney:0, specialNotPaidHours:0, specialNotPaidMoney:0})

    const getMonthCalculations = () => {
        const results = handleCalculations(lessonRecord, currentDate);
        updateTotalValues(results);
    }



    return (
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
                <button className='month-total-button calculations__button' onClick={getMonthCalculations}>CALCULAR TOTALES</button>
                <button className='month-total-button pdf-button' onClick={() => onCreatePDF(true)}>Exportar PDF</button>
            </li>
        </ul>
    )
}


export default MonthTotals;