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
        <main className='lesson-creator__container'>
            <button className='register-lesson__button' onClick={() => updateIsFormVisible(!isFormVisible)}>
                {isFormVisible ? t('specific.lessonCreator.dismiss') : t('specific.lessonCreator.register')}
            </button>
            {isFormVisible && (
            <form className='form__container' onSubmit={createNewLesson}>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.date')}</label>
                        <input type="date" name='date' required />
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.start')}</label>
                        <input type="time" name='startTime' required/>
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.finish')}</label>
                        <input type="time" name='finishTime' required/>
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.rate')}</label>
                        <input type="text" name='rate' required/>
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.type')}</label>
                        <select name="type" id="TYPE" className='register-select'>
                            <option value="school">{t('specific.lessonCreator.school')}</option>
                            <option value="private">{t('specific.lessonCreator.private')}</option>
                            <option value="special">{t('specific.lessonCreator.special')}</option>
                        </select>
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.players')}</label>
                        <input type="text" name='players' />
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title'>{t('specific.lessonCreator.club')}</label>
                        <input type="text" name='club' />
                    </div>
                    <div className='label-input__container'>
                        <label className='input-title' htmlFor="PAID">{t('specific.lessonCreator.paid')}</label>
                        <select name="paid" id="PAID" className='register-select'>
                            <option value="no">{t('specific.lessonCreator.no')}</option>
                            <option value="yes">{t('specific.lessonCreator.yes')}</option>
                        </select>
                    </div>
                    <input id='SUBMIT' type="submit" value={'GO!'} />
            </form>
            )}
        </main>
    )
}


export default LessonCreator;