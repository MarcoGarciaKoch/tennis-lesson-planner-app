import './style.css';
import { useEffect, useState } from 'react';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { monthDays } from './record.utils';
import MonthDay from './Components/MonthDay';
import AlertMessage from '../Dashboard/Components/AlertMessage';
import { DateData, FilteredDateData } from './record.model'
import Filters from './Components/Filters';
import PdfGenerator from './Components/PdfGenerator';
import MonthTotals from './Components/MonthTotals';




const Record: React.FC = () => {
    const [ date, updateDate ] = useState<DateData>({monthNumber:0, monthName:'', year:0});
    const [ isTotalVisible, updateIsTotalVisible ] = useState<boolean>(false);
    const [createPdf, updateCreatePdf] = useState<boolean>(false);
    const [dateFilterData, updateDateFilterData] = useState<FilteredDateData>({filterStartDate:'',filterFinishtDate:'', differenceInDays:NaN});

    useEffect( () => {
        const today = new Date();
        const monthNumber = today.getMonth()+1;
        const monthName = today.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        const year = today.getFullYear();
        updateDate({ monthNumber, monthName, year });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const getFilteredDate = (filterdeDate:FilteredDateData) => {
        updateDateFilterData(filterdeDate)
    }



    const sendIntructionToCreatePdf = (value:boolean) => {
        updateCreatePdf(value)
    }


    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <Filters onGetFilteredDate={getFilteredDate}></Filters>
            <section className='month-ref__container'>
                <div className='month-title__container'>
                    <span>{date.monthName}</span>
                    <button className='totals-button' onClick={() => updateIsTotalVisible(!isTotalVisible)}>
                        TOTAL MES
                        <span 
                            className='totals-button-arrow'
                        >▽</span>
                    </button>
                </div>
                <MonthTotals isTotalVisible={isTotalVisible} date={date} onCreatePDF={sendIntructionToCreatePdf}></MonthTotals>
            </section>

            {isNaN(dateFilterData.differenceInDays)
            ?
                Array.from(Array(monthDays[date.monthNumber]).keys()).map((dayOfMonth:number) => (
                    <MonthDay key={dayOfMonth} dayOfMonth={dayOfMonth} date={date}></MonthDay>
                ))
            :
                Array.from(Array(dateFilterData.differenceInDays).keys()).map((dayOfMonth:number) => (
                    <MonthDay key={dayOfMonth} dayOfMonth={dayOfMonth} date={date}></MonthDay>
                ))
            }

            <AlertMessage></AlertMessage>
            <PdfGenerator currentDate={date} createPDF={createPdf} onUpdateCreatePdf={updateCreatePdf}></PdfGenerator>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Record;