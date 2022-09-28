import './style.css'
import { useContext } from 'react';
import { LessonRecordContext } from '../../../../Context/LessonRecord/lessonRecord.context';



const Filters: React.FC = () => {
    const { lessonRecord } = useContext(LessonRecordContext);
    
    
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
           <section>
            <form className='date-filter__form' onSubmit={searchLessonsByDate}>
                <label>
                    Fecha Inicio
                    <input type="date" name='startDate' placeholder='dd/mm/aaaa' required/>
                </label>
                <label>
                    Fecha Fin
                    <input type="date" name='finishDate' placeholder='dd/mm/aaaa' required/>
                </label>
                <button type='submit'>BUSCAR</button>
            </form>
           </section>
           <section>
            Resto de filtros
           </section>
        </main>
    )
}


export default Filters