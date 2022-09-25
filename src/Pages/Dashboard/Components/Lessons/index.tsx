import './style.css';
import { LessonData } from '../../dashboard.model';
import { useState, useContext } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { calcFinalPrice, sortLessons } from '../../utils';
import { AlertMessageCallContext } from '../../../../Context/AlertMessageCall/alertMessageCall.context';
import { useUsers } from '../../../../Core/users/users.hook';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';


const Lessons: React.FC<{lesson:LessonData}> = ({lesson}) => {
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [dateValue, updateDateValue] = useState<string>(lesson.date);
    const [startTimeValue, updateStartTimeValue] = useState<string>(lesson.startTime);
    const [finishTimeValue, updateFinishTimeValue] = useState<string>(lesson.finishTime);
    const [totalPriceValue, updateTotalPriceValue] = useState<string>(lesson.price);
    const [playersValue,  updatePlayersValue] = useState<string>(lesson.players)
    const [clubValue, updateClubValue] = useState<string>(lesson.club);
    const [typeValue, updateTypeValue] = useState<string>(lesson.type);
    const { updateLessonRecord } = useContext(LessonRecordContext);
    const { updateAlertParameters } = useContext(AlertMessageCallContext);
    const { updateLesson } = useUsers();
    const [displayFullLessonData, updateDisplayFullLessonData] = useState<boolean>(false);
    const [t] = useTranslation('translation');


    //Function that allows to edit the card editable fields and update the main array of lessons with the lesson edited
    const editLesson = () => {
        setDisableButton(!disableButton)
        lesson.date = dateValue;
        lesson.startTime = startTimeValue;
        lesson.finishTime = finishTimeValue;
        lesson.price = totalPriceValue;
        lesson.players = playersValue;
        lesson.club = clubValue;
        lesson.type = typeValue;
        
        updateLesson(lesson).then(r => {
            const sortedLessonArray = sortLessons(r.lessons); //call 'sortLessons function to sort the lesson array in ascending order by date
            updateLessonRecord(sortedLessonArray)
        })
        
    }
    
    return (
        <main className={`card__container ${lesson.paid === 'no' ? 'pending' : 'paid'}`}>
            {
                disableButton ?
                <select name='lessonType'
                        id='LESSONTYPE'
                        className='lesson-type__icon icon-select'
                        onChange={e => updateTypeValue(e.target.value)}>
                            <option value={typeValue}>{typeValue === 'school' ? t('specific.lesson.school') : typeValue === 'private' ? t('specific.lesson.private') : '⭐'}</option>
                            <option value="school">{t('specific.lesson.school')}</option>
                            <option value="private">{t('specific.lesson.private')}</option>
                            <option value="special">⭐</option>
                </select>
                :
                <div className='lesson-type__icon'>
                    {typeValue === 'school' ? t('specific.lesson.school') : typeValue === 'private' ? t('specific.lesson.private') : '⭐'}
                </div>
            }
            <div className={`time__container 
                        ${lesson.paid === 'no' ? 'pending__container' : 'paid__container'} 
                        ${disableButton === true ? lesson.paid === 'no' ? 'pending-editable' : 'paid-editable' : ''}`
                        }
                onClick={() => disableButton === false ? updateDisplayFullLessonData(!displayFullLessonData) : ''}>
                <label>
                    {t('specific.lesson.date')}
                    <input  type="text"
                            onChange={e => updateDateValue(e.target.value)} 
                            value={dateValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                </label>
                <label>
                    {t('specific.lesson.start')}
                    <input  type="text" 
                            onChange={e => {
                                updateStartTimeValue(e.target.value); 
                                updateTotalPriceValue(`${calcFinalPrice(e.target.value, finishTimeValue, lesson.rate)}€`);
                            }} 
                            value={startTimeValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                </label>
                <label>
                    {t('specific.lesson.finish')}
                    <input  type="text" 
                            onChange={e => {
                                updateFinishTimeValue(e.target.value); 
                                updateTotalPriceValue(`${calcFinalPrice(startTimeValue, e.target.value, lesson.rate)}€`);
                            }} 
                            value={finishTimeValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                </label>
            </div>
            <div className={`${displayFullLessonData ? 'price-players-club__container' : 'non-visible__container'}
                        ${lesson.paid === 'no' ? 'pending__container' : 'paid__container'} 
                        ${disableButton === true ? lesson.paid === 'no' ? 'pending-editable' : 'paid-editable' : ''}`
                        }>
                <label>
                    {t('specific.lesson.price')}
                    <input  type="text" 
                            onChange={e => updateTotalPriceValue(e.target.value)} 
                            value={totalPriceValue} 
                            readOnly={!disableButton} 
                            disabled={!disableButton} />
                </label>
                <label>
                    {t('specific.lesson.players')}
                    <textarea  onChange={e => updatePlayersValue(e.target.value)} 
                                value={playersValue} 
                                readOnly={!disableButton} 
                                disabled={!disableButton} 
                                cols={20} 
                                rows={2} 
                                wrap='hard'/>
                </label>
                <label>
                    {t('specific.lesson.club')}
                    <textarea  onChange={e => updateClubValue(e.target.value)} 
                                value={clubValue} 
                                readOnly={!disableButton} 
                                disabled={!disableButton}
                                cols={20} 
                                rows={2} 
                                wrap='hard' />
                </label>
            </div> 
            <div className={displayFullLessonData ? 'buttons__container' : 'non-visible__container'}>
                <button className={`button ${disableButton === false ? lesson.paid === 'no' ? 'pending-button' : 'paid-button' : 'innactive-move-button'}`} 
                        onClick={() => disableButton === false ? updateAlertParameters({id:lesson.id, show:true, action:'move'}) : ''}>
                            {lesson.paid === 'no' ? t('specific.lesson.buttonPaid') : t('specific.lesson.buttonPending')}
                </button>
                <button className='button edit-button' 
                        onClick={editLesson}> 
                            {disableButton === true ? <AiFillSave /> : <AiFillEdit />}
                </button>
                <button className={`button ${disableButton === false ? 'delete-button' : 'innactive-delete-button'}`} 
                        onClick={() => disableButton === false ? updateAlertParameters({id:lesson.id, show:true, action:'delete'}) : ''}>
                            <MdDelete />
                </button>
            </div>
            <div 
                className={
                `${lesson.paid === 'no'? 'arrow-pending' : 'arrow-paid'}
                ${displayFullLessonData ? 'arrow-display-close' : 'arrow-display-open'}`
                }
            >▽</div>  
        </main>
    )
    
}


export default Lessons;