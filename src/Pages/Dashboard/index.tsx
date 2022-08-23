import './style.css';
import { LessonData } from './dashboard.model';
import LessonCreator from './Components/LessonCreator';
import Lessons from './Components/Lessons';
import { useContext, useEffect } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import AlertMessage from './Components/AlertMessage';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { sortLessons } from './utils';
import { useUsers } from '../../Core/users/users.hook';


const Dashboard: React.FC = () => {
    const { lessonRecord, updateLessonRecord } = useContext(LessonRecordContext);
    const { getLessonList } = useUsers();

    useEffect(() => {
        getLessonList().then(r => {
            const sortedLessonArray = sortLessons(r.lessons); //call 'sortLessons function to sort the lesson array in ascending order by date
            updateLessonRecord(sortedLessonArray)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <Header></Header>
        <main className='dashboard__container'>
            <LessonCreator></LessonCreator>
            <div className={lessonRecord.length > 0 ? 'hidden-register-lesson-instrucctions' : 'register-lesson-instrucctions'}>
                <p>There are no lessons created to preview yet.</p>
                <p>To register your first lesson, press the button above and complete the required fields.</p>
                <p>Once the lesson is created, you will see it in your dashboard.</p>
            </div>
            <h1 className='pending-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'no') ? 'Pending Lessons To Get Paid' : ''}</h1>
            {lessonRecord?.map((l:LessonData) => l.paid === 'no' ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            <h1 className='paid-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'yes') ? 'Paid Lessons' : ''}</h1>
            {lessonRecord?.map((l:LessonData) => l.paid === 'yes' ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;