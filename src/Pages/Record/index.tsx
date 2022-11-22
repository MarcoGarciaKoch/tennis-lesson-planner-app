import './style.css';
import { useEffect, useState } from 'react';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import MonthDay from './Components/MonthDay';
import AlertMessage from '../Dashboard/Components/AlertMessage';
import { DateData } from './record.model'
import Filters from './Components/Filters';
import PdfGenerator from './Components/PdfGenerator';
import MonthTotals from './Components/MonthTotals';
import moment from 'moment';
import { monthNames } from './record.utils';


const Record: React.FC = () => {
    const [ dateData, updateDateData ] = useState<DateData>({monthName:'', year:'', monthList:[]});
    const [ isTotalVisible, updateIsTotalVisible ] = useState<boolean>(false);
    const [createPdf, updateCreatePdf] = useState<boolean>(false);
    const [resetFilters, setResetFilters] = useState<boolean>(false);

    useEffect( () => {
        const monthNumber = Number(moment().format('MM'));
        const monthName = monthNames[monthNumber-1];
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
                    <span>{`${dateData.monthName.toUpperCase()} ${dateData.year}`}</span>
                    <button className='totals-button' onClick={() => updateIsTotalVisible(!isTotalVisible)}>
                        TOTAL MES
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