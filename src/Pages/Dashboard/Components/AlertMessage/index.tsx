import './style.css';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { AlertMessageCallContext } from '../../../../Context/AlertMessageCall/alertMessageCall.context';
import { LessonData } from '../../dashboard.model';
import { sortLessons } from '../../utils';


const AlertMessage: React.FC = () => {
    const [lessonRecord, updateLessonRecord] = useContext(LessonRecordContext);
    const [isVisible, updateIsVisible] = useState<boolean>(false);
    const [alertParameters] = useContext(AlertMessageCallContext);

    useEffect(() =>{
        if(alertParameters.show) updateIsVisible(true);
    },[alertParameters]);

     // Function to move one lesson from 'Clases Pendientes de Cobro' to 'Clases Cobradas' or viceversa
    const moveLessonToPaidOrPending = () => {
        const updateLesson = lessonRecord.find((l:LessonData) => l.id === alertParameters.id);
        if (updateLesson.paid === 'yes') {
            updateLesson.paid = 'no'; // Update paid status to 'no'
        }else {
            updateLesson.paid = 'yes'; //update paid status to 'yes'
        }
        const arrWithoutUpdateLesson = lessonRecord.filter((l:LessonData) => l.id !== alertParameters.id);
        const sortedLessonArray = sortLessons([...arrWithoutUpdateLesson, updateLesson]); //call 'sortLessons function to sort the lesson array in ascending order by date
        updateLessonRecord(sortedLessonArray);
        updateIsVisible(false);
    }

     // Function to delete one lesson either from 'Clases Pendientes de Cobro' or 'Clases Cobradas'
    const deleteLesson = () => {
        const updatedLessonsArr = lessonRecord.filter((l:LessonData) => l.id !== alertParameters.id);
        updateLessonRecord(updatedLessonsArr);
        updateIsVisible(false);
    }

    return (
        <main className={isVisible === true ? 'alert-visible' : 'alert-not-visible'}>
            <h1>{`¿Seguro que quieres ${alertParameters.action === 'delete' ? 'borrar' : 'mover'} la clase de tenis?`}</h1>
            <section className='alert-buttons__container'>
                <button 
                    className='yes-button' 
                    onClick={alertParameters.action === 'delete' ? deleteLesson : moveLessonToPaidOrPending}
                >SI</button>
                <button 
                    className='no-button' 
                    onClick={() => updateIsVisible(false)}
                >NO</button>
            </section>
        </main>
    )
}


export default AlertMessage;