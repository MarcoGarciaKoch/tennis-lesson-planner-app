import './style.css';
import { useState, useContext } from 'react';
import { AlertMessageCallContext } from '../../../../Context/AlertMessageCall/alertMessageCall.context';
import { DailyLessonData } from '../../record.model';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { useUsers } from '../../../../Core/users/users.hook';
import { sortLessons, calcFinalPrice } from '../../../Dashboard/utils';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';



const DailyLesson:  React.FC<{dailyLesson:DailyLessonData, isDailyVisible:boolean}> = ({dailyLesson, isDailyVisible}) => {
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const { updateAlertParameters } = useContext(AlertMessageCallContext);
    const [startTimeValue, updateStartTimeValue] = useState<string>(dailyLesson.startTime);
    const [finishTimeValue, updateFinishTimeValue] = useState<string>(dailyLesson.finishTime);
    const [isPaidValue, updateIsPaidValue] = useState<string>(dailyLesson.paid);
    const [totalPriceValue, updateTotalPriceValue] = useState<string>(dailyLesson.price);
    const [playersValue,  updatePlayersValue] = useState<string>(dailyLesson.players)
    const [clubValue, updateClubValue] = useState<string>(dailyLesson.club);
    const [typeValue, updateTypeValue] = useState<string>(dailyLesson.type);
    const { updateLesson } = useUsers();
    const { updateLessonRecord } = useContext(LessonRecordContext);
    const [t] = useTranslation('translation');


    //Function that allows to edit the card editable fields and update the main array of lessons with the lesson edited
    const editLesson = () => {
        setDisableButton(!disableButton)
        dailyLesson.startTime = startTimeValue;
        dailyLesson.finishTime = finishTimeValue;
        dailyLesson.paid = isPaidValue;
        dailyLesson.price = totalPriceValue;
        dailyLesson.players = playersValue;
        dailyLesson.club = clubValue;
        dailyLesson.type = typeValue;
        
        updateLesson(dailyLesson).then(r => {
            const sortedLessonArray = sortLessons(r.lessons); //call 'sortLessons function to sort the lesson array in ascending order by date
            updateLessonRecord(sortedLessonArray)
        })
        
    }

    return (
        <main className={isDailyVisible ? 'daily-lesson__container' : 'daily-lesson-non-visible'}>
            <section className='lesson-info__container'>
                <div className='daily-lesson-type__icon'>
                    {dailyLesson.type === 'school' ? t('specific.lesson.school') : dailyLesson.type === 'private' ? t('specific.lesson.private') : '⭐'}
                </div>
                <div className={disableButton === false ? 'daily-details__container' : 'daily-details__container editable-daily-details__container'}>
                    <label>
                        <span>Horario:</span>
                        <textarea  
                            className='lesson-starting-time'
                            onChange={e => {
                                updateStartTimeValue(e.target.value);
                                updateTotalPriceValue(`${calcFinalPrice(e.target.value, finishTimeValue, dailyLesson.rate)} €`);
                            }} 
                            value={startTimeValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                        <div className='hyphen-container'>-</div>
                        <textarea  
                            onChange={e => {
                                updateFinishTimeValue(e.target.value);
                                updateTotalPriceValue(`${calcFinalPrice(startTimeValue, e.target.value, dailyLesson.rate)} €`);
                            }} 
                            value={finishTimeValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                    </label>
                    <label>
                        <span>Precio:</span>
                        <textarea  
                            className='lesson-price'
                            onChange={e => updateTotalPriceValue(e.target.value)} 
                            value={totalPriceValue}
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                        <div className='hyphen-container'>-</div>
                        {
                        disableButton ?
                        <select 
                            name='isPaidLesson'
                            className='lesson-select-ispaid'
                            onChange={e => updateIsPaidValue(e.target.value)}>
                                <option value={isPaidValue}>{isPaidValue === 'yes' ? 'Pagada' : 'No Pagada'}</option>
                                <option value={isPaidValue === 'yes' ? 'no' : 'yes'}>{isPaidValue === 'yes' ? 'No Pagada' : 'Pagada'}</option>
                        </select>
                        :
                        <p>
                            {`${dailyLesson.paid === 'yes' ? 'Pagada' : 'No Pagada'}`}
                        </p>
                        }
                    </label>
                    <label>
                        <span>Jugadores: </span>
                        <textarea  
                            onChange={e => updatePlayersValue(e.target.value)} 
                            value={playersValue}
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                    </label>
                    <label>
                        <span>Club: </span>
                        <textarea  
                            onChange={e => updateClubValue(e.target.value)} 
                            value={clubValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                    </label>
                </div>
                <section className='daily-buttons__container'>
                    <button 
                        className='daily-buttons daily-edit-button'
                        onClick={editLesson}> 
                            {disableButton === true ? <AiFillSave /> : <AiFillEdit />}
                    </button>
                    <button
                        className={`daily-buttons daily-delete-button ${disableButton === false ? 'daily-delete-button' : 'daily-innactive-button'}`}
                        onClick={() => disableButton === false ? updateAlertParameters({ id: dailyLesson.id, show: true, action: 'delete' }) : ''}>
                            <MdDelete />
                    </button>
                </section>
            </section>
        </main>
    )
}


export default DailyLesson;
