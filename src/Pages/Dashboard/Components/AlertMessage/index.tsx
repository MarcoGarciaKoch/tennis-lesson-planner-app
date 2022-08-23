import './style.css';
import { useContext, useEffect, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';
import { AlertMessageCallContext } from '../../../../Context/AlertMessageCall/alertMessageCall.context';
import { LessonData } from '../../dashboard.model';
import { sortLessons } from '../../utils';
import { alertMessageInitialValues } from '../../../../Context/AlertMessageCall/alertMessageCall.context';
import { useUsers } from '../../../../Core/users/users.hook';


const AlertMessage: React.FC = () => {
    const {lessonRecord, updateLessonRecord} = useContext(LessonRecordContext);
    const [isVisible, updateIsVisible] = useState<boolean>(false);
    const { alertParameters, updateAlertParameters } = useContext(AlertMessageCallContext);
    const { updateLesson, deleteLesson } = useUsers();

    useEffect(() =>{
        if(alertParameters.show) updateIsVisible(true);
    },[alertParameters]);

     // Function to move one lesson from 'Clases Pendientes de Cobro' to 'Clases Cobradas' or viceversa
    const moveLessonToPaidOrPending = () => {
        const updatedLesson = lessonRecord.find((l:LessonData) => l.id === alertParameters.id)!;
        if (updatedLesson?.paid === 'yes') {
            updatedLesson.paid = 'no'; // Update paid status to 'no'
        }else if (updatedLesson?.paid === 'no') {
            updatedLesson.paid = 'yes'; //update paid status to 'yes'
        }
        updateLesson(updatedLesson).then(r => {
            const sortedLessonArray = sortLessons([...r.lessons, updateLesson]); //call 'sortLessons function to sort the lesson array in ascending order by date
            updateLessonRecord(sortedLessonArray);
        })
        updateIsVisible(false);
        updateAlertParameters(alertMessageInitialValues);
    }

     // Function to delete one lesson either from 'Pending Lessons To Get Paid' or 'Paid Lessons'
    const deleted = () => {
        deleteLesson(alertParameters).then(r => {
            updateLessonRecord(r);
        })
        updateIsVisible(false);
        updateAlertParameters(alertMessageInitialValues);
    }

    return (
        <main className={isVisible === true ? 'alert-visible' : 'alert-not-visible'}>
            <h1>{`¿Are you sure you want to ${alertParameters.action === 'delete' ? 'delete' : 'move'} this tennis lesson?`}</h1>
            <section className='alert-buttons__container'>
                <button 
                    className='yes-button' 
                    onClick={alertParameters.action === 'delete' ? deleted : moveLessonToPaidOrPending}
                >YES</button>
                <button 
                    className='no-button' 
                    onClick={() => {
                        updateIsVisible(false);
                        updateAlertParameters(alertMessageInitialValues);
                    }}
                >NO</button>
            </section>
        </main>
    )
}


export default AlertMessage;