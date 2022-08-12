import './style.css';
import { ReactElement, useContext, useEffect } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import { LessonData } from '../Dashboard/dashboard.model';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';


const Record: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext)

    useEffect( () => {
        console.log(lessonRecord)
    },[lessonRecord])

    return (
        <>
        <Header></Header>
        <main className='record__container'>
            <h1>Hola</h1>
        </main>
        <Footer></Footer>
        </>
    )
}


export default Record;