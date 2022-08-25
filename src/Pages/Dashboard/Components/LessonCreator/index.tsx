import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { LessonData } from '../../dashboard.model';
import { calcFinalPrice, sortLessons } from '../../utils';
import { useUsers } from '../../../../Core/users/users.hook';
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';

const LessonCreator: React.FC = () => {
    const { registerNewLesson } = useUsers();
    const { updateLessonRecord } = useContext(LessonRecordContext);
    const [isFormVisible, updateIsFormVisible] = useState<boolean>(false);

     // Function that creates a new Lesson and adds it to the lessonRecord array.
     const createNewLesson = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newLesson: LessonData = {
            id: uuidv4(),
            date: e.currentTarget.date.value,
            startTime: e.currentTarget.startTime.value,
            finishTime: e.currentTarget.finishTime.value,
            rate: e.currentTarget.rate.value,
            price:`${calcFinalPrice(e.currentTarget.startTime.value, e.currentTarget.finishTime.value, e.currentTarget.rate.value)}€`,
            paid: e.currentTarget.paid.value,
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
            <button 
                className='register-lesson__button' 
                onClick={() => updateIsFormVisible(!isFormVisible)}>{isFormVisible ? 'Dismiss' : 'Register a New Lesson'}
            </button>
            <form className={isFormVisible ? 'form__container' : 'hidden-form__container'} onSubmit={createNewLesson}>
                    <input type="date" name='date' required/>
                    <input type="time" name='startTime' required/>
                    <input type="time" name='finishTime' required/>
                    <input type="text" name='rate' placeholder='Hour Rate'/>
                    <input type="text" name='players' placeholder='Players'/>
                    <input type="text" name='club' placeholder='Club'/>
                    <label className='paid-label' htmlFor="PAID">Paid?
                        <select name="paid" id="PAID">
                            <option value="no">NO</option>
                            <option value="yes">YES</option>
                        </select>
                    </label>
                    <input id='SUBMIT' type="submit" value={'GO!'} />
            </form>
        </section>
    )
}


export default LessonCreator;