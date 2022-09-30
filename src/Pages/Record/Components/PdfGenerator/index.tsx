import './style.css';
import { useContext, useEffect, useRef } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { LessonData } from '../../../Dashboard/dashboard.model';
import PdfDailyLesson from './Components/PdfDailyLesson';
import { CurrentDate } from '../../record.model';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';



const PdfGenerator: React.FC<{currentDate:CurrentDate, createPDF:boolean}> = ({currentDate, createPDF}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const printRef = useRef(null);

    useEffect(() => {
        const generatePDF = async (ref:any) => {
        if(createPDF) { 
                const element = ref;
                const canvas = await html2canvas(element!);
                const data = canvas.toDataURL('image/png');

                const pdf = new jsPDF();
                const imgProperties = pdf.getImageProperties(data);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight =
                (imgProperties.height * pdfWidth) / imgProperties.width;

                pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('print.pdf');
            }
        }
            generatePDF(printRef.current);
    },[createPDF])


    return (
        <main className='pdf__container' ref={printRef}>
            <span>{currentDate.monthName}</span>
            {
                lessonRecord.map((l:LessonData) => (
                    parseInt(l.date.split('-')[1]) === currentDate.monthNumber &&
                    parseInt(l.date.split('-')[2]) === currentDate.year
                    ? 
                    <PdfDailyLesson key={l.id} lesson={l}></PdfDailyLesson> 
                    : 
                    '')
                )
            }
        </main>
    )
}


export default PdfGenerator