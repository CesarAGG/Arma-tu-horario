import { Day, Time } from './mydaytime';

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

export interface ISession {
    startTime: Time;
    endTime: Time;
}

export interface IClassSchedule {
    monday?: ISession;
    tuesday?: ISession;
    wednesday?: ISession;
    thursday?: ISession;
    friday?: ISession;
    saturday?: ISession;
}
