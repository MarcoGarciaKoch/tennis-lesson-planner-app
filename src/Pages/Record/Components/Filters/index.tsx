import './style.css'
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';



const Filters: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [isFilterVisible, updateIsFilterVisible] = useState<boolean>(false);
    
    
    // Function that gets the start and finish dates to filter lessons by given date.
    const searchLessonsByDate = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const startDate = e.currentTarget.startDate.value.split('-');
        const finishDate =  e.currentTarget.finishDate.value.split('-');

        const dateDetails = [
            {
                
            },
            {

            }
        ]

        console.log(startDate, finishDate)
        
        e.currentTarget.reset();
    }

    return (
        <main className='filters__container'>
            <button className='show-filters__button' onClick={() => updateIsFilterVisible(!isFilterVisible)}>
                FILTROS
            </button>
            {isFilterVisible && (
            <section className='filters-divider'>
                <form className='date-filter__form' onSubmit={searchLessonsByDate}>
                    <label>
                        Fecha Inicio
                        <input type="date" name='startDate' placeholder='dd/mm/aaaa' required/>
                    </label>
                    <label>
                        Fecha Fin
                        <input type="date" name='finishDate' placeholder='dd/mm/aaaa' required/>
                    </label>
                    <button className='search__button' type='submit'>BUSCAR</button>
                <button className='delete-filters__button' type='button'>BORRAR FILTROS</button>
                </form>
                <div className='more-filters'></div>
            </section>
            )}
        </main>
    )
}


export default Filters