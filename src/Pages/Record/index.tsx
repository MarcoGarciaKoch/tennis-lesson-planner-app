import './style.css';
import { useEffect, useState } from 'react';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { monthDays } from './record.utils';
import MonthDay from './Components/MonthDay';
import AlertMessage from '../Dashboard/Components/AlertMessage';
import { CurrentDate } from './record.model'
import Filters from './Components/Filters';
import PdfGenerator from './Components/PdfGenerator';
import MonthTotals from './Components/MonthTotals';



const Record: React.FC = () => {
    const [ currentDate, updateCurrentDate ] = useState<CurrentDate>({monthNumber:0, monthName:'', year:0});
    const [ isTotalVisible, updateIsTotalVisible ] = useState<boolean>(false);
    const [createPdf, updateCreatePdf] = useState<boolean>(false);

    useEffect( () => {
        const today = new Date();
        const monthNumber = today.getMonth()+1;
        const monthName = today.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        const year = today.getFullYear();
        updateCurrentDate({ monthNumber, monthName, year });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const sendIntructionToCreatePdf = (value:boolean) => {
        updateCreatePdf(value)
    }


    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <Filters></Filters>
            <section className='month-ref__container'>
                <div className='month-title__container'>
                    <span>{currentDate.monthName}</span>
                    <button className='totals-button' onClick={() => updateIsTotalVisible(!isTotalVisible)}>
                        TOTAL MES
                        <span 
                            className='totals-button-arrow'
                        >▽</span>
                    </button>
                </div>
                <MonthTotals isTotalVisible={isTotalVisible} currentDate={currentDate} onCreatePDF={sendIntructionToCreatePdf}></MonthTotals>
            </section>
            {Array.from(Array(monthDays[currentDate.monthNumber]).keys()).map((dayOfMonth:number, i:number) => (
                <MonthDay key={i} dayOfMonth={dayOfMonth} currentDate={currentDate}></MonthDay>
            ))}
            <AlertMessage></AlertMessage>
            <PdfGenerator currentDate={currentDate} createPDF={createPdf} onUpdateCreatePdf={updateCreatePdf}></PdfGenerator>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Record;