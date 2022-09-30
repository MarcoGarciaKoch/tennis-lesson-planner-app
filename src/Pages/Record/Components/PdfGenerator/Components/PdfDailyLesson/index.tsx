import './style.css';
import { LessonData } from '../../../../../Dashboard/dashboard.model';
import { useTranslation } from 'react-i18next';


const PdfDailyLesson: React.FC<{lesson:LessonData}> = ({lesson}) => {
    const [t] = useTranslation('translation');

    return (
        <main className='pdf-daily-lesson__container'>
            <section className='pdf-lesson-type__icon'>
                {lesson.type === 'school' ? t('specific.typeLessonIcon.school') : lesson.type === 'private' ? t('specific.typeLessonIcon.private') : '⭐'}
            </section>
            <section className='pdf-daily-details__container'>
                <div>
                    <p>Horario:</p>
                    <p>{lesson.startTime}</p>
                    <p>{lesson.finishTime}</p>
                </div>
                <div>
                    <p>Precio:</p>
                    <p>{lesson.price}</p>
                </div>
                <div>
                    <p>{lesson.paid === 'yes' ? 'Pagada' : 'No Pagada'}</p>
                </div>
                <div>
                    <p>Jugadores:</p>
                    <p>{lesson.players}</p>
                </div>
                <div>
                    <p>Club:</p>
                    <p>{lesson.club}</p>
                </div>
            </section>
    </main>
    )
}


export default PdfDailyLesson