import './style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import MonthDay from './Components/MonthDay';
import AlertMessage from '../Dashboard/Components/AlertMessage';
import { DateData } from './record.model'
import Filters from './Components/Filters';
import PdfGenerator from './Components/PdfGenerator';
import MonthTotals from './Components/MonthTotals';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useMonthTranslation } from './Components/UseMonthTranslation';



const Record: React.FC = () => {
    const [ dateData, updateDateData ] = useState<DateData>({monthName:'', year:'', monthList:[]});
    const [ isTotalVisible, updateIsTotalVisible ] = useState<boolean>(false);
    const [createPdf, updateCreatePdf] = useState<boolean>(false);
    const [resetFilters, setResetFilters] = useState<boolean>(false);
    const [t] = useTranslation('translation');
    const { getMonthNamebyNumber, getMonthNamebyName } = useMonthTranslation();


    useEffect( () => {
        const monthNumber = Number(moment().format('MM'));
        const monthName = getMonthNamebyNumber(monthNumber);
        const year = moment().format('YYYY'); 
        
        function getDaysArrayCurrentDate() {
            let daysInMonth = moment().daysInMonth();
            let arrDays = [];
            while(daysInMonth) {
                const current = moment().date(daysInMonth);
                arrDays.push(current);
                daysInMonth--;
            }
            return arrDays;
        }
        const result = getDaysArrayCurrentDate();
        const monthList = result.map(day => day.format('DD-MM-YYYY')).reverse();
        updateDateData({ monthName, year, monthList });
    },[resetFilters]);


    const getFilteredDate = (dateDataFiltered:DateData) => {
        updateDateData(dateDataFiltered)
    }

    const getTotalsTimePeriodTitle = useMemo(() => {
        const monthNameArr = dateData.monthName.split(' ');
        let finalMonthName = getMonthNamebyName(monthNameArr[0])
        if(monthNameArr.length === 1) {
            finalMonthName = getMonthNamebyName(monthNameArr[0])
        }else if(monthNameArr.length === 3) {
            const initialMonth = getMonthNamebyName(monthNameArr[0]);
            const lastMonth = getMonthNamebyName(monthNameArr[2]);
            finalMonthName = `${initialMonth} - ${lastMonth}`;
        }else if(monthNameArr.length === 5) {
            const initialMonth = getMonthNamebyName(monthNameArr[0]);
            const lastMonth = getMonthNamebyName(monthNameArr[3]);
            finalMonthName = `${initialMonth} ${monthNameArr[1]} - ${lastMonth} ${monthNameArr[4]}`;
        }
        return finalMonthName.toUpperCase() + ' ' + dateData.year;
    },[dateData, getMonthNamebyName, resetFilters])


    const sendIntructionToCreatePdf = (value:boolean) => {
        updateCreatePdf(value)
    }


    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <Filters onGetFilteredDate={getFilteredDate} onResetFilters={() => setResetFilters(!resetFilters)}></Filters>
            <section className='month-ref__container'>
                <div className='month-title__container'>
                    <span>{getTotalsTimePeriodTitle}</span>
                    <button className='totals-button' onClick={() => updateIsTotalVisible(!isTotalVisible)}>
                        {t('specific.record.totalsButton')}
                        <span 
                            className='totals-button-arrow'
                        >▽</span>
                    </button>
                </div>
                <MonthTotals isTotalVisible={isTotalVisible} dateData={dateData} onCreatePDF={sendIntructionToCreatePdf}></MonthTotals>
            </section>
            {dateData.monthList?.map((day:string, i:number) => (
                    <MonthDay key={i} dayOfMonth={day}></MonthDay>
            ))}

            <AlertMessage></AlertMessage>
            <PdfGenerator currentDate={dateData} createPDF={createPdf} onUpdateCreatePdf={updateCreatePdf}></PdfGenerator>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Record;