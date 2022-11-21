import { LessonData } from "./dashboard.model";


// Function that sorts (increasing order) and returns the existing array of Lessons before updating the lessonRecord state (context)
export const sortLessons = (lessonArray:LessonData[]) => {
    const result = lessonArray?.sort((a:LessonData, b:LessonData) => {
        const reverseA = a.date?.split('-').reverse().join('-')
        const reverseB = b.date?.split('-').reverse().join('-')
        if (reverseA < reverseB) {
            return -1;
        }else if (reverseA > reverseB) {
            return 1
        }else {
            if (a.startTime < b.startTime) {
                return -1
            }else if(a.startTime > b.startTime) {
                return 1
            }else if(a.finishTime < b.finishTime) {
                return -1
            }else if(a.finishTime > b.finishTime) {
                return 1
            }else {
                return 0
            }
        }
    })
    return result;
}


 // Function that calculates the final price of the lesson
export const calcFinalPrice = (start:string, finish:string, rate:string) => {
    const startingTime = start.split(':');
    const finishingTime = finish.split(':');
    const finalPrice = Math.round((((Number(finishingTime[0]) * 60 + Number(finishingTime[1]))/60) - ((Number(startingTime[0]) * 60 + Number(startingTime[1]))/60)) * Number(rate));
    return finalPrice.toString();
    }


// Function that given the array with all the lessons, returns a new array with ONLY the LAST 7 lessons PAID

export const getLastSevenPaidLessons = (sortedLessonArray:LessonData[], optionSelected:string) => {
    if(optionSelected === 'all') {
        const paidLessons = sortedLessonArray.filter((l:LessonData) => l.paid === 'yes')
        return paidLessons
    }else{
        const lessonQty = Number(optionSelected);
        const paidLessons = sortedLessonArray.filter((l:LessonData) => l.paid === 'yes').slice(-lessonQty, sortedLessonArray.length);
        return paidLessons;
    }
}