import './style.css';
import { LessonData } from './dashboard.model';
import LessonCreator from './Components/LessonCreator';
import Lessons from './Components/Lessons';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../Context/LessonRecord/lessonRecord.context';
import AlertMessage from './Components/AlertMessage';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import { useTranslation } from 'react-i18next';
import { sortLessons, getLastSevenPaidLessons } from './utils'
import { useUsers } from '../../Core/users/users.hook';


const Dashboard: React.FC = () => {
    const { lessonRecord, updateLessonRecord } = useContext(LessonRecordContext);
    const [ userNameLastname, updateUserNameLastname ] = useState<string[]>([])
    const { getUserData } = useUsers()
    const [t] = useTranslation('translation');

    useEffect(() => {
        getUserData().then((r:{name:string, lastname:string, lessons:LessonData[]}) => {
            updateUserNameLastname([r.name, r.lastname])
            //call 'sortLessons function to sort the lesson array in ascending order by date
            const sortedLessonArray = sortLessons(r.lessons);
            updateLessonRecord(sortedLessonArray);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <Header></Header>
        <main className='dashboard__container'>
            <div className='user-welcome__title'>{t('specific.dashboard.greetings')} <span>{`${userNameLastname[0]} ${userNameLastname[1]}`}</span></div>
            <LessonCreator></LessonCreator>
            <div className={lessonRecord.length > 0 ? 'hidden-register-lesson-instrucctions' : 'register-lesson-instrucctions'}>
                <p>{t('specific.dashboard.messageOne')}</p>
                <p>{t('specific.dashboard.messageTwo')}</p>
                <p>{t('specific.dashboard.messageThree')}</p>
            </div>
            <h1 className='pending-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'no') ? t('specific.dashboard.pending') : ''}</h1>
            {lessonRecord?.map((l:LessonData) => l.paid === 'no' ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            <h1 className='paid-lessons-title'>{lessonRecord?.some((l:LessonData) => l.paid === 'yes') ? t('specific.dashboard.paid') : ''}</h1>
            {getLastSevenPaidLessons(lessonRecord)?.map((l:LessonData) => <Lessons key={l.id} lesson={l}></Lessons>)}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;