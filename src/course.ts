export class Course {
    title: string;
    professor: string;
    classSchedule: IClassSchedule;

    constructor(title: string, professor: string, schedule: IClassSchedule) {
        this.title = title;
        this.professor = professor;
        this.classSchedule = schedule;
    }

    /**
     * If the class starts and ends at the same time every day, this can
     * be used to make the code more readable.
     * @param days array of days in which the class should be scheduled
     * @param session start and end time of the class
     * @returns an instance of the interface IClassSchedule
     */
    static classScheduleFromDays(days: Day[], session: ISession) {
        let schedule: IClassSchedule = {
            "monday": days.includes("monday") ? session : undefined,
            "tuesday": days.includes("tuesday") ? session : undefined,
            "wednesday": days.includes("wednesday") ? session : undefined,
            "thursday": days.includes("thursday") ? session : undefined,
            "friday": days.includes("friday") ? session : undefined,
            "saturday": days.includes("saturday") ? session : undefined,
        };
        return schedule;
    }

    setSession(day: Day, session: ISession) {
        this.classSchedule[day] = session;
    }

    getSession(day: Day): ISession {
        return this.classSchedule[day];
    }

}

type HH = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23';
type MM = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
type Time = `${HH}:${MM}`;

interface ISession {
    startTime: Time;
    endTime: Time;
}

interface IClassSchedule {
    monday?: ISession;
    tuesday?: ISession;
    wednesday?: ISession;
    thursday?: ISession;
    friday?: ISession;
    saturday?: ISession;
}
