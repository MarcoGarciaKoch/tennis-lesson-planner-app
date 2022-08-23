import './style.css';
import { useContext, useEffect } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';


const Record: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);

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