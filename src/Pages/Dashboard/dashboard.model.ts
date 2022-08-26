
export type LessonData = {
    id: string;
    date: string;
    startTime: string;
    finishTime: string;
    rate: string;
    price: string;
    paid: string;
    type: string;
    players: string;
    club: string
}

export type AlertMessageData = {
    id:string;
    show:boolean;
    action:string
}