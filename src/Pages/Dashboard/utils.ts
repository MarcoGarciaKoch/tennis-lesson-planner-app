import { LessonData } from "./dashboard.model";


// Function that sorts (increasing order) and returns the existing array of Lessons before updating the lessonRecord state (context)
export const sortLessons = (lessonArray:LessonData[]) => {
    const result = lessonArray.sort((a:LessonData, b:LessonData) => {
        if (a.date < b.date) {
            return -1;
        }else if (a.date > b.date) {
            return 1
        }else {
            if (a.startTime < b.startTime) {
                return -1
            }else if(a.startTime > b.startTime) {
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
    const finalPrice = Math.floor((((Number(finishingTime[0]) * 60 + Number(finishingTime[1]))/60) - ((Number(startingTime[0]) * 60 + Number(startingTime[1]))/60)) * Number(rate));
    return finalPrice.toString();
    }