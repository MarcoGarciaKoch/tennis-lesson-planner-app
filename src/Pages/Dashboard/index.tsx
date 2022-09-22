import './style.css';
import { LessonData } from './dashboard.model';
import LessonCreator from './Components/LessonCreator';
import Lessons from './Components/Lessons';
import { useContext } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import AlertMessage from './Components/AlertMessage';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Dashboard: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const navigate = useNavigate();
    const [t] = useTranslation('translation');

    return (
        <>
        <Header></Header>
        <main className='dashboard__container'>
            <section className='lesson-creator-record__container'>
                <LessonCreator></LessonCreator>
                <div className='record-logo' onClick={() => navigate('/record')}></div>
            </section>
            <div className={lessonRecord.length > 0 ? 'hidden-register-lesson-instrucctions' : 'register-lesson-instrucctions'}>
                <p>{t('specific.dashboard.messageOne')}</p>
                <p>{t('specific.dashboard.messageTwo')}</p>
                <p>{t('specific.dashboard.messageThree')}</p>
            </div>
            <h1 className='pending-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'no') ? t('specific.dashboard.pending') : ''}</h1>
            {lessonRecord?.map((l:LessonData) => l.paid === 'no' ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            <h1 className='paid-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'yes') ? t('specific.dashboard.paid') : ''}</h1>
            {lessonRecord?.map((l:LessonData, i:number) => l.paid === 'yes' && i >= lessonRecord.length - 7 ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;