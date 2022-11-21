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
    const radioOptions = [{id:1,name:'last7',value:'7',title:'Last 7'},{id:2,name:'last15',value:'15',title:'Last 15'},
                            {id:3,name:'last30',value:'30',title:'Last 30'},{id:4,name:'all',value:'all', title:'All'}]
    const [paidLessonOption, setPaidLessonOption] = useState<string>('7')
    const [lessonsToPrint, setLessonsToPrint] = useState<LessonData[]>([])
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

    useEffect(() => {
        const lessons = getLastSevenPaidLessons(lessonRecord, paidLessonOption)
        setLessonsToPrint(lessons)
    },[lessonRecord, paidLessonOption])

    return (
        <>
        <Header></Header>
        <main className='dashboard__container'>
            <div className='user-welcome__title'>
                {t('specific.dashboard.greetings')} <span>{`${userNameLastname[0]} ${userNameLastname[1]}`}</span>
            </div>
            <LessonCreator></LessonCreator>
            <div className={lessonRecord.length > 0 ? 'hidden-register-lesson-instrucctions' : 'register-lesson-instrucctions'}>
                <p>{t('specific.dashboard.messageOne')}</p>
                <p>{t('specific.dashboard.messageTwo')}</p>
                <p>{t('specific.dashboard.messageThree')}</p>
            </div>
            <h1 className='pending-lessons-title'>
                {lessonRecord?.some((l:LessonData) => l.paid === 'no') ? t('specific.dashboard.pending') : ''}
            </h1>
            {lessonRecord?.map((l:LessonData) => l.paid === 'no' ? <Lessons key={l.id} lesson={l}></Lessons> : '')}
            {lessonRecord?.some((l:LessonData) => l.paid === 'yes') &&
                    (<fieldset className='paid-lesson-fieldset'>
                        <legend>
                            <h1 className='paid-lessons-title'>{t('specific.dashboard.paid')}</h1>
                        </legend>
                        <div className='paid-lesson-form'>
                            {radioOptions.map((option) => {
                                return (
                                    <label key={option.id} htmlFor={option.name} className='paid-lesson-option'>
                                        {option.title}
                                    <input 
                                        type="radio" 
                                        id={option.name} 
                                        name="paid-shown-options" 
                                        value={option.value}
                                        onChange={e => setPaidLessonOption(e.target.value)}
                                        checked={paidLessonOption === option.value} />
                            </label>
                                )
                            })}
                        </div>
                    </fieldset>) 
            }
            {lessonsToPrint?.map((l:LessonData) => <Lessons key={l.id} lesson={l}></Lessons>)}
            <AlertMessage></AlertMessage>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;