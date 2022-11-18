import './style.css'
import { useState } from 'react';
import { FilteredDateData } from '../../record.model';



const Filters: React.FC<{onGetFilteredDate(filterdeDate:FilteredDateData):void}> = ({onGetFilteredDate}) => {
    const [isFilterVisible, updateIsFilterVisible] = useState<boolean>(false);
    const [filterStartDate, updateFilterStartDate] = useState<string>('');
    const [filterFinishtDate, updateFilterFinishDate] = useState<string>('');
    
    
    // Function that gets the start and finish dates to filter lessons by given date.
    const searchLessonsByDate = () => {
        const startDateFilter = new Date(filterStartDate)
        const finishDateFilter = new Date(filterFinishtDate)

        const differenceInTime = finishDateFilter.getTime() - startDateFilter.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)+1;

        onGetFilteredDate({
            filterStartDate,
            filterFinishtDate,
            differenceInDays
        })

        updateFilterStartDate('');
        updateFilterFinishDate('');

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