import './style.css';
import { DailyLessonData } from '../../record.model';


const DailyLesson:  React.FC<{dailyLesson:DailyLessonData}> = ({dailyLesson}) => {


    return (
        <h1>{dailyLesson.date.split('-').reverse().join('-')}</h1>
    )
}


export default DailyLesson;