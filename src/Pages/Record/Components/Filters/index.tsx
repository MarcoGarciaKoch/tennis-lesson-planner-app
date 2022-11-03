import './style.css'
import { useContext, useState } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';



const Filters: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    const [isFilterVisible, updateIsFilterVisible] = useState<boolean>(false);
    const [filterStartDate, updateFilterStartDate] = useState<string>('');
    const [filterFinishtDate, updateFilterFinishDate] = useState<string>('');
    
    
    // Function that gets the start and finish dates to filter lessons by given date.
    const searchLessonsByDate = () => {

        const dateDetails = [
            {
                
            },
            {

            }
        ]

    }

    return (
        <main className='filters__container'>
            <button className='show-filters__button' onClick={() => updateIsFilterVisible(!isFilterVisible)}>
                FILTROS
            </button>
            {isFilterVisible && (
                <main className='filter-buttons__divider'>
                    <section className='filters-divider'>
                        <div className='date-filter__container'>
                            <label>
                                Fecha Inicio
                                <input 
                                    onChange={(e) => updateFilterStartDate(e.target.value)}
                                    value={filterStartDate}
                                    type="date" 
                                    name='startDate' 
                                    placeholder='dd/mm/aaaa' 
                                    required/>
                            </label>
                            <label>
                                Fecha Fin
                                <input 
                                    onChange={(e) => updateFilterFinishDate(e.target.value)}
                                    value={filterFinishtDate}
                                    type="date" 
                                    name='finishDate' 
                                    placeholder='dd/mm/aaaa' 
                                    required/>
                            </label>
                        </div>
                        <div className='more-filters'></div>
                    </section>
                    <section className='buttons_container'>
                        <button 
                            onClick={searchLessonsByDate}
                            className='search__button' 
                            type='submit'
                            >BUSCAR
                        </button>
                        <button 
                            className='delete-filters__button' 
                            type='button'
                            >BORRAR FILTROS
                        </button>
                    </section>
                </main>
            )}
        </main>
    )
}


export default Filters