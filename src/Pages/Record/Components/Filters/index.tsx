import './style.css'
import { useState } from 'react';
import moment  from 'moment';
import { DateData } from '../../record.model';
import { monthNames } from '../../record.utils';

const Filters: React.FC<{onGetFilteredDate:(dateDataFiltered:DateData) => void, onResetFilters:()=> void}> = ({onGetFilteredDate, onResetFilters}) => {
    const [isFilterVisible, updateIsFilterVisible] = useState<boolean>(false);
    const [filterStartDate, updateFilterStartDate] = useState<string>('');
    const [filterFinishtDate, updateFilterFinishDate] = useState<string>('');
    
    
    // Function that generates and array of dates between two given dates.
    const searchLessonsByDate = () => {
        const startDateFilter = new Date(filterStartDate)
        const finishDateFilter = new Date(filterFinishtDate)

        const calculateDateList = ({ start, end }:any) => {
            let now = moment.utc(start);
            end = moment.utc(end);
            let monthList = [];
            while (now.isValid() && end.isValid() && now.isSameOrBefore(end, 'day') /* end day inclusive */) {
                monthList.push(now.format('DD-MM-YYYY'));
                now = moment(now).add(1, 'days'); // add 1 day on a new instance 
            }
            let initialMonth = '';
            let lastMonth = '';
            let year = '';
            if(monthList[0].split('-')[2] === monthList[monthList.length-1].split('-')[2]) {
                initialMonth = monthNames[Number(monthList[0].split('-')[1])-1];
                lastMonth = monthNames[Number(monthList[monthList.length-1].split('-')[1])-1];
                year = monthList[monthList.length-1].split('-')[2];
            } else {
                initialMonth = `${monthNames[Number(monthList[0].split('-')[1])-1]} ${monthList[0].split('-')[2]}`;
                lastMonth = `${monthNames[Number(monthList[monthList.length-1].split('-')[1])-1]} ${monthList[monthList.length-1].split('-')[2]}`;
            }
            return {
                monthName:`${initialMonth} - ${lastMonth}`,
                year,
                monthList
            };
        }
        const dateDataFiltered = calculateDateList({start: startDateFilter, end: finishDateFilter})

        onGetFilteredDate(dateDataFiltered)

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
                            onClick={onResetFilters}
                            >BORRAR FILTROS
                        </button>
                    </section>
                </main>
            )}
        </main>
    )
}


export default Filters