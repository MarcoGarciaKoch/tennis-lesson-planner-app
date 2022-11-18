import { LessonData } from "../Dashboard/dashboard.model";
import { DateData } from "./record.model";

export const monthDays = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
]


//Function that handles all the calculations for the different lesson types and returns and object with all the calculated data
export const handleCalculations = (lessons:LessonData[], dateData:DateData) => {
    const schoolPaidHours = calcHours(lessons, 'school', 'yes', dateData.monthNumber, dateData.year)
    const schoolPaidMoney = calcMoney(lessons, 'school', 'yes', dateData.monthNumber, dateData.year)
    const schoolNotPaidHours = calcHours(lessons, 'school', 'no', dateData.monthNumber, dateData.year)
    const schoolNotPaidMoney = calcMoney(lessons, 'school', 'no', dateData.monthNumber, dateData.year)

    const privatePaidHours = calcHours(lessons, 'private', 'yes', dateData.monthNumber, dateData.year)
    const privatePaidMoney = calcMoney(lessons, 'private', 'yes', dateData.monthNumber, dateData.year)
    const privateNotPaidHours = calcHours(lessons, 'private', 'no', dateData.monthNumber, dateData.year)
    const privateNotPaidMoney = calcMoney(lessons, 'private', 'no', dateData.monthNumber, dateData.year)

    const specialPaidHours = calcHours(lessons, 'special', 'yes', dateData.monthNumber, dateData.year)
    const specialPaidMoney = calcMoney(lessons, 'special', 'yes', dateData.monthNumber, dateData.year)
    const specialNotPaidHours = calcHours(lessons, 'special', 'no', dateData.monthNumber, dateData.year)
    const specialNotPaidMoney = calcMoney(lessons, 'special', 'no', dateData.monthNumber, dateData.year)
    return {schoolPaidHours, schoolPaidMoney, schoolNotPaidHours, schoolNotPaidMoney,
                        privatePaidHours, privatePaidMoney, privateNotPaidHours, privateNotPaidMoney,
                            specialPaidHours, specialPaidMoney, specialNotPaidHours, specialNotPaidMoney}
}



// Function that calculates the hours worked (output), based on the lesson type, if those are paid or not and month and year to take into account (inputs)
const calcHours = (lessons:LessonData[], lessonType:string, paid:string, month:number, year:number) => {
    const parsedMonth = month < 10 ? '0' + month : month.toString();

    const currentMonthLessons = lessons
        ?.filter((lesson:LessonData) => 
            lesson.date.split('-')[2] === year.toString() && lesson.date.split('-')[1] === parsedMonth);
    
    const filteredTypeLesson = currentMonthLessons
        ?.filter((lesson:LessonData) => 
            lesson.type === lessonType && lesson.paid === paid);
    
    const hoursCalc = filteredTypeLesson
        ?.reduce((acc:number, lesson:LessonData): number => 
        acc += new Date("01/01/2007 " + lesson.finishTime).getHours() - new Date("01/01/2007 " + lesson.startTime).getHours()
        , 0)
    
    return hoursCalc
}



// Function that calculates the money earned (output), b    ased on the lesson type, if it is paid or not and month and year to take into account (inputs)
const calcMoney = (lessons:LessonData[], lessonType:string, paid:string, month:number, year:number) => {
    const parsedMonth = month < 10 ? '0' + month : month.toString();

    const currentMonthLessons = lessons
        ?.filter((lesson:LessonData) => 
            lesson.date.split('-')[2] === year.toString() && lesson.date.split('-')[1] === parsedMonth);

    const filteredTypeLesson = currentMonthLessons
        ?.filter((lesson:LessonData) => 
            lesson.type === lessonType && lesson.paid === paid);

    const moneyCalc = filteredTypeLesson
        ?.reduce((acc:number, lesson:LessonData): number => 
            acc += parseFloat(lesson.price), 0)
    
    return moneyCalc
}