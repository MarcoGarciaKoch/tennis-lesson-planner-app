import './style.css';
import { DailyLessonData } from '../../record.model';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md'



const DailyLesson:  React.FC<{dailyLesson:DailyLessonData, isDailyVisible:boolean}> = ({dailyLesson, isDailyVisible}) => {
    const [t] = useTranslation('translation');

    return (
        <main className={isDailyVisible ? 'daily-lesson__container' : 'daily-lesson-non-visible'}>
            <section className='lesson-info__container'>
                <div className='daily-lesson-type__icon'>
                    {dailyLesson.type === 'school' ? t('specific.lesson.school') : dailyLesson.type === 'private' ? t('specific.lesson.private') : '⭐'}
                </div>
                <div className='type-price__container'>
                    <p>{dailyLesson.paid === 'yes' ? 'Pagada' : 'No Pagada'}</p>
                    <p>{dailyLesson.price}</p>
                </div>
                <div className='start-time-players__container'>
                    <p>{dailyLesson.startTime}</p>
                    <p>{dailyLesson.players === '' ? '----' : dailyLesson.players}</p>
                </div>
                <div className='finish-time-club__container'>
                    <p>{dailyLesson.finishTime}</p>
                    <p>{dailyLesson.club === '' ? '----' : dailyLesson.club}</p>
                </div>
                <section className='daily-buttons__container'>
                    <div className='daily-buttons daily-edit-button'><AiFillEdit /></div>
                    <div className='daily-buttons daily-delete-button'><MdDelete /></div>
                </section>
            </section>
        </main>
    )
}


export default DailyLesson;
