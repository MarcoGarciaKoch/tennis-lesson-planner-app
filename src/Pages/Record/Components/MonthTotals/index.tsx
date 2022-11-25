import './style.css';
import { useContext, useMemo } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { DateData } from '../../record.model';
import { handleCalculations } from '../../record.utils';
import { useTranslation } from 'react-i18next';


const MonthTotals: React.FC<{isTotalVisible:boolean, dateData:DateData, onCreatePDF:(value:boolean) => void}> = ({isTotalVisible, dateData, onCreatePDF}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [t] = useTranslation('translation');


    const monthlyCalculations = useMemo(() => {
        const results = handleCalculations(lessonRecord, dateData);
        return results
    },[lessonRecord, dateData])



    return (
        <ul className={isTotalVisible ? 'totals__list' : 'totals__list-non-visible'}>
            <li className='lesson-calcs__list-item'>
                <h4> {t('specific.record.totals.school')}</h4>
                <div>
                    <p>{t('specific.record.totals.paidHours')} <span>{`${monthlyCalculations.schoolPaidHours} horas  -  ${monthlyCalculations.schoolPaidMoney} €`}</span></p>
                    <p>{t('specific.record.totals.unpaidHours')} <span>{`${monthlyCalculations.schoolNotPaidHours} horas  -  ${monthlyCalculations.schoolNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>{t('specific.record.totals.private')}</h4>
                <div>
                    <p>{t('specific.record.totals.paidHours')} <span>{`${monthlyCalculations.privatePaidHours} horas  -  ${monthlyCalculations.privatePaidMoney} €`}</span></p>
                    <p>{t('specific.record.totals.unpaidHours')} <span>{`${monthlyCalculations.privateNotPaidHours} horas  -  ${monthlyCalculations.privateNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>{t('specific.record.totals.special')}</h4>
                <div>
                    <p>{t('specific.record.totals.paidHours')} <span>{`${monthlyCalculations.specialPaidHours} horas  -  ${monthlyCalculations.specialPaidMoney} €`}</span></p>
                    <p>{t('specific.record.totals.unpaidHours')} <span>{`${monthlyCalculations.specialNotPaidHours} horas  -  ${monthlyCalculations.specialNotPaidMoney} €`}</span></p>
                </div>
            </li>
            <li className='lesson-calcs__list-item'>
                <h4>{t('specific.record.totals.totals')}</h4>
                <div>
                    <p>{t('specific.record.totals.paidHours')} <span>{`${monthlyCalculations.schoolPaidHours + monthlyCalculations.privatePaidHours + monthlyCalculations.specialPaidHours} horas  -  
                                            ${monthlyCalculations.schoolPaidMoney + monthlyCalculations.privatePaidMoney + monthlyCalculations.specialPaidMoney} €`}
                                        </span></p>
                    <p>{t('specific.record.totals.unpaidHours')} <span>{`${monthlyCalculations.schoolNotPaidHours + monthlyCalculations.privateNotPaidHours + monthlyCalculations.specialNotPaidHours} horas  -  
                                            ${monthlyCalculations.schoolNotPaidMoney + monthlyCalculations.privateNotPaidMoney + monthlyCalculations.specialNotPaidMoney} €`}
                                        </span></p>
                </div>
            </li>
            <li className='calcs-button__list-item'>
                {/* <button className='month-total-button calculations__button' onClick={getMonthCalculations}>CALCULAR TOTALES</button> */}
                <button className='month-total-button pdf-button' onClick={() => onCreatePDF(true)}>{t('specific.record.totals.exportpdf')}</button>
            </li>
        </ul>
    )
}


export default MonthTotals;