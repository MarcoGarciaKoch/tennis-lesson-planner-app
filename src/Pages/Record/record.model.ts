
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
    monthName:string;
    year: string;
    monthList:string[];
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

