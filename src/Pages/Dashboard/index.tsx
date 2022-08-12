import './style.css';
import { LessonData } from './dashboard.model';
import LessonCreator from './Components/LessonCreator';
import Lessons from './Components/Lessons';
import { useContext } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import AlertMessage from './Components/AlertMessage';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';


const Dashboard: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);


    return (
        <>
        <Header></Header>
        <main className='dashboard__container'>
            <LessonCreator></LessonCreator>
            <h1 className='pending-lessons-title'>Pending Lessons To Get Paid</h1>
            {lessonRecord.map((l:LessonData,i:number) => l.paid === 'no' ? <Lessons key={i} lesson={l}></Lessons> : '')}
            <h1 className='paid-lessons-title'>Paid Lessons</h1>
            {lessonRecord.map((l:LessonData,i:number) => l.paid === 'yes' ? <Lessons key={i} lesson={l}></Lessons> : '')}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;