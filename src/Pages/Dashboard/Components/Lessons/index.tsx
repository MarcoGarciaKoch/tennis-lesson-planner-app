import './style.css';
import { LessonData } from '../../dashboard.model';
import { useState, useContext } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { calcFinalPrice } from '../../utils';
import { MdDeleteOutline } from 'react-icons/md'
import { AlertMessageCallContext } from '../../../../Context/AlertMessageCall/alertMessageCall.context';


const Lessons: React.FC<{lesson:LessonData}> = ({lesson}) => {
    
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [dateValue, updateDateValue] = useState<string>(lesson.date);
    const [startTimeValue, updateStartTimeValue] = useState<string>(lesson.startTime);
    const [finishTimeValue, updateFinishTimeValue] = useState<string>(lesson.finishTime);
    const [totalPriceValue, updateTotalPriceValue] = useState<string>(lesson.price);
    const [playersValue,  updatePlayersValue] = useState<string>(lesson.players)
    const [clubValue, updateClubValue] = useState<string>(lesson.club);
    const [lessonRecord, updateLessonRecord] = useContext(LessonRecordContext);
    const [, updateAlertParameters] = useContext(AlertMessageCallContext);

    
    //Function that allows to edit the card editable fields and update the main array of lessons with the lesson edited
    const editLesson = () => {
        setDisableButton(!disableButton)
        lesson.date = dateValue;
        lesson.startTime = startTimeValue;
        lesson.finishTime = finishTimeValue;
        lesson.price = totalPriceValue;
        lesson.players = playersValue;
        lesson.club = clubValue;
        
        const arrayWithoutCurrentLesson = lessonRecord.filter((l:LessonData) => l.id !== lesson.id);
        updateLessonRecord([...arrayWithoutCurrentLesson, lesson]);
    }


    return (
        <main>
                <section className={`card__container ${lesson.paid === 'no' ? 'pending' : 'paid'}`}>
                <div className={`time__container 
                                ${lesson.paid === 'no' ? 'pending__container' : 'paid__container'} 
                                ${disableButton === true ? lesson.paid === 'no' ? 'pending-editable' : 'paid-editable' : ''}`
                                }>
                    <label>
                        Fecha:
                        <input  type="text" 
                                onChange={e => updateDateValue(e.target.value)} 
                                value={dateValue.split('-').reverse().join('-')} 
                                readOnly={!disableButton} 
                                disabled={!disableButton} />
                    </label>
                    <label>
                        Comienzo:
                        <input  type="text" 
                                onChange={e => {
                                    updateStartTimeValue(e.target.value); 
                                    const result = calcFinalPrice(e.target.value, finishTimeValue, lesson.rate);
                                    updateTotalPriceValue(`${result}€`);
                                }} 
                                value={startTimeValue} 
                                readOnly={!disableButton} 
                                disabled={!disableButton} />
                    </label>
                    <label>
                        Finalización:
                        <input  type="text" 
                                onChange={e => {
                                    updateFinishTimeValue(e.target.value); 
                                    const result = calcFinalPrice(startTimeValue, e.target.value, lesson.rate);
                                    updateTotalPriceValue(`${result}€`);
                                }} 
                                value={finishTimeValue} 
                                readOnly={!disableButton} 
                                disabled={!disableButton} />
                    </label>
                </div>
                <div className={`price-players-club__container 
                                ${lesson.paid === 'no' ? 'pending__container' : 'paid__container'} 
                                ${disableButton === true ? lesson.paid === 'no' ? 'pending-editable' : 'paid-editable' : ''}`
                                }>
                    <label>
                        Precio total:
                        <input  type="text" 
                                onChange={e => updateTotalPriceValue(e.target.value)} 
                                value={totalPriceValue} readOnly={!disableButton} 
                                disabled={!disableButton} />
                    </label>
                    <label>
                        Alumnos:
                        <textarea  onChange={e => updatePlayersValue(e.target.value)} 
                                   value={playersValue} 
                                   readOnly={!disableButton} 
                                   disabled={!disableButton} 
                                   cols={20} 
                                   rows={2} 
                                   wrap='hard'/>
                    </label>
                    <label>
                        Club:
                        <textarea  onChange={e => updateClubValue(e.target.value)} 
                                   value={clubValue} 
                                   readOnly={!disableButton} 
                                   disabled={!disableButton}
                                   cols={20} 
                                   rows={2} 
                                   wrap='hard' />
                    </label>
                </div> 
                <div className='buttons__container'>
                    <button className={`button ${disableButton === false ? lesson.paid === 'no' ? 'pending-button' : 'paid-button' : 'innactive'}`} 
                            onClick={() => disableButton === false ? updateAlertParameters({id:lesson.id, show:true, action:'move'}) : ''}>{lesson.paid === 'no' ? 'MOVER A COBRADA' : 'MOVER A PENDIENTE'}</button>
                    <button className='button edit-button' 
                            onClick={editLesson}> {disableButton === true ? 'GUARDAR' : 'EDITAR'} </button>
                    <button className={`button ${disableButton === false ? 'delete-button' : 'innactive'}`} 
                            onClick={() => disableButton === false ? updateAlertParameters({id:lesson.id, show:true, action:'delete'}) : ''}><MdDeleteOutline /></button>
                </div>  
            </section>
        </main>
    )
}


export default Lessons;