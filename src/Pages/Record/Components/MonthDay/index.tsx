import './style.css';
import DailyLesson from '../DailyLesson';
import { LessonData } from '../../../Dashboard/dashboard.model';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { useTranslation } from 'react-i18next';
import { useMonthTranslation } from '../UseMonthTranslation';



const MonthDay: React.FC<{dayOfMonth:string}> = ({dayOfMonth}) => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [ isDailyVisible, updateIsDailyVisible] = useState<boolean>(false);
    const [t] = useTranslation('translation');
    const { getMonthName } = useMonthTranslation();


    return (
        lessonRecord.filter((l:LessonData) => l.date === dayOfMonth).length === 0
        ?
        <></>
        :
        (
        <main className='individual-day__container'>
            <section className='monthday-qty__container'>
                <div className='day-lesson-title' onClick={() => updateIsDailyVisible(!isDailyVisible)}>
                    {t('specific.record.monthDay.lessons')} {dayOfMonth.split('-')[0]} 
                    {t('specific.record.monthDay.of')} {getMonthName(Number(dayOfMonth.split('-')[1]))}
                </div>
                <div className='day-lessons-qty'>
                    {lessonRecord.filter((l:LessonData) => l.date === dayOfMonth).length}
                </div>
            </section>
            <section className='lesson-list__container'>
                {lessonRecord.map((l:LessonData) => l.date === dayOfMonth && (
                    <DailyLesson key={l.id} dailyLesson={l} isDailyVisible={isDailyVisible}></DailyLesson>))}
            </section>    
        </main>
        )
    )
}


export default MonthDay