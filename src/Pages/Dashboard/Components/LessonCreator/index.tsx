import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { LessonData } from '../../dashboard.model';
import { calcFinalPrice, sortLessons } from '../../utils';
import { useUsers } from '../../../../Core/users/users.hook';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { useTranslation } from 'react-i18next';

const LessonCreator: React.FC = () => {
    const { registerNewLesson } = useUsers();
    const { updateLessonRecord } = useContext(LessonRecordContext);
    const [isFormVisible, updateIsFormVisible] = useState<boolean>(false);
    const [t] = useTranslation('translation');
    

     // Function that creates a new Lesson and adds it to the lessonRecord array.
    const createNewLesson = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newLesson: LessonData = {
            id: uuidv4(),
            date: e.currentTarget.date.value.split('-').reverse().join('-'),
            startTime: e.currentTarget.startTime.value,
            finishTime: e.currentTarget.finishTime.value,
            rate: e.currentTarget.rate.value,
            price:`${calcFinalPrice(e.currentTarget.startTime.value, e.currentTarget.finishTime.value, e.currentTarget.rate.value)}€`,
            paid: e.currentTarget.paid.value,
            type: e.currentTarget.type.value,
            players: e.currentTarget.players.value,
            club: e.currentTarget.club.value
        }
        registerNewLesson(newLesson).then(r => {
            const sortedLessonArray = sortLessons(r.lessons); //call 'sortLessons function to sort the lesson array in ascending order by date
            updateLessonRecord(sortedLessonArray)
        });
        e.currentTarget.reset();
        updateIsFormVisible(false);
    }
    
    return (
        <section className='lesson-creator__container'>
            <button className='register-lesson__button' onClick={() => updateIsFormVisible(!isFormVisible)}>
                {isFormVisible ? t('specific.lessonCreator.dismiss') : t('specific.lessonCreator.register')}
            </button>
            <form className={isFormVisible ? 'form__container' : 'hidden-form__container'} onSubmit={createNewLesson}>
                    <input type="date" name='date' placeholder='dd/mm/aaaa' required />
                    <input type="time" name='startTime' placeholder='hh:mm' required/>
                    <input type="time" name='finishTime' placeholder='hh:mm' required/>
                    <input type="text" name='rate' placeholder={t('specific.lessonCreator.rate')} required/>
                    <label className='type-label' htmlFor="TYPE">{t('specific.lessonCreator.type')}
                        <select name="type" id="TYPE">
                            <option value="school">{t('specific.lessonCreator.school')}</option>
                            <option value="private">{t('specific.lessonCreator.private')}</option>
                            <option value="special">{t('specific.lessonCreator.special')}</option>
                        </select>
                    </label>
                    <input type="text" name='players' placeholder={t('specific.lessonCreator.players')}/>
                    <input type="text" name='club' placeholder={t('specific.lessonCreator.club')}/>
                    <label className='paid-label' htmlFor="PAID">{t('specific.lessonCreator.paid')}
                        <select name="paid" id="PAID">
                            <option value="no">{t('specific.lessonCreator.no')}</option>
                            <option value="yes">{t('specific.lessonCreator.yes')}</option>
                        </select>
                    </label>
                    <input id='SUBMIT' type="submit" value={'GO!'} />
            </form>
        </section>
    )
}


export default LessonCreator;