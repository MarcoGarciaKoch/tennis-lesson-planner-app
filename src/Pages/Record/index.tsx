import './style.css';
import { ReactElement, useContext, useEffect } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import { LessonData } from '../Dashboard/dashboard.model';


const Record: React.FC = () => {
    const [lessonRecord] = useContext(LessonRecordContext)

    useEffect( () => {
        console.log(lessonRecord)
    },[lessonRecord])

    return (
        <main className='record__container'>
            <h1>Hola</h1>
        </main>
    )
}


export default Record;