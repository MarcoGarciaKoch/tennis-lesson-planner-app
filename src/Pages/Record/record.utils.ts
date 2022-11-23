import { LessonData } from "../Dashboard/dashboard.model";
import { DateData } from "./record.model";

export const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]


//Function that handles all the calculations for the different lesson types and returns and object with all the calculated data
export const handleCalculations = (lessons:LessonData[], dateData:DateData) => {
    
    const lessonsToUse = lessons.filter(lesson => {
        const lessonDate = lesson.date.split('-').reverse().join('-');
        const minDate = dateData.monthList[0]?.split('-').reverse().join('-');
        const maxDate = dateData.monthList[dateData.monthList.length-1]?.split('-').reverse().join('-');

        if(lessonDate >= minDate && lessonDate <= maxDate) {
            return lesson;
        }
        return ''
    })

    const schoolPaidHours = calcHours(lessonsToUse, 'school', 'yes')
    const schoolPaidMoney = calcMoney(lessonsToUse, 'school', 'yes')
    const schoolNotPaidHours = calcHours(lessonsToUse, 'school', 'no')
    const schoolNotPaidMoney = calcMoney(lessonsToUse, 'school', 'no')

    const privatePaidHours = calcHours(lessonsToUse, 'private', 'yes')
    const privatePaidMoney = calcMoney(lessonsToUse, 'private', 'yes')
    const privateNotPaidHours = calcHours(lessonsToUse, 'private', 'no')
    const privateNotPaidMoney = calcMoney(lessonsToUse, 'private', 'no')

    const specialPaidHours = calcHours(lessonsToUse, 'special', 'yes')
    const specialPaidMoney = calcMoney(lessonsToUse, 'special', 'yes')
    const specialNotPaidHours = calcHours(lessonsToUse, 'special', 'no')
    const specialNotPaidMoney = calcMoney(lessonsToUse, 'special', 'no')

    return {schoolPaidHours, schoolPaidMoney, schoolNotPaidHours, schoolNotPaidMoney,
            privatePaidHours, privatePaidMoney, privateNotPaidHours, privateNotPaidMoney,
            specialPaidHours, specialPaidMoney, specialNotPaidHours, specialNotPaidMoney}
}



// Function that calculates the hours worked (output), based on the lesson type, if those are paid or not and month and year to take into account (inputs)
const calcHours = (lessons:LessonData[], lessonType:string, paid:string) => {
    const filteredTypeLesson = lessons?.filter((lesson:LessonData) => 
            lesson.type === lessonType && lesson.paid === paid);

    const hoursCalc = filteredTypeLesson?.reduce((acc:number, lesson:LessonData): number => 
        acc += new Date("01/01/2007 " + lesson.finishTime).getHours() - new Date("01/01/2007 " + lesson.startTime).getHours()
        , 0)

    return hoursCalc
}



// Function that calculates the money earned (output), b    ased on the lesson type, if it is paid or not and month and year to take into account (inputs)
const calcMoney = (lessons:LessonData[], lessonType:string, paid:string) => {
    const filteredTypeLesson = lessons?.filter((lesson:LessonData) => 
            lesson.type === lessonType && lesson.paid === paid);

    const moneyCalc = filteredTypeLesson?.reduce((acc:number, lesson:LessonData): number => 
            acc += parseFloat(lesson.price), 0)
            
    return moneyCalc
}