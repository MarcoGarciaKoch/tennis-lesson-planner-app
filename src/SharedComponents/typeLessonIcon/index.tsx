import './style.css';
import { LessonData } from '../../Pages/Dashboard/dashboard.model';
import { useTranslation } from 'react-i18next';



const TypeLessonIcon: React.FC<{isDisableButton:boolean, lesson:LessonData, onUpdateTypeValue:(value:string) => void }> = ({isDisableButton, lesson, onUpdateTypeValue}) => {
    const [t] = useTranslation('translation');

    return (
            isDisableButton 
            ?
            <select name='lessonType'
                    id='LESSONTYPE'
                    className='lesson-type__icon icon-select'
                    onChange={e => onUpdateTypeValue(e.target.value)}
                    defaultValue={lesson.type}>
                        <option className='school-option' value="school">
                            {t('specific.typeLessonIcon.school')}
                        </option>
                        <option className='private-option' value="private">
                            {t('specific.typeLessonIcon.private')}
                        </option>
                        <option className='special-option' value="special">
                            ⭐
                        </option>
            </select>
            :
            <div className='lesson-type__icon'>
                {lesson.type === 'school' ? t('specific.typeLessonIcon.school') : lesson.type === 'private' ? t('specific.typeLessonIcon.private') : '⭐'}
            </div>
    )
}



export default TypeLessonIcon