
export interface DailyLessonData {
    id: string;
    date: string;
    startTime: string;
    finishTime: string;
    rate: string;
    price: string;
    paid: string;
    type: string;
    players: string;
    club: string;
}

export interface DateData {
    monthNumber:number; 
    monthName:string;
    year: number;
}

export interface FilteredDateData {
    filterStartDate:string,
    filterFinishtDate:string,
    differenceInDays:number
}

export interface TotalCalcValues {
    schoolPaidHours: number;
    schoolPaidMoney: number;
    schoolNotPaidHours: number;
    schoolNotPaidMoney: number;
    privatePaidHours: number; 
    privatePaidMoney: number; 
    privateNotPaidHours: number; 
    privateNotPaidMoney: number;
    specialPaidHours: number; 
    specialPaidMoney: number;
    specialNotPaidHours: number;
    specialNotPaidMoney: number;
}

