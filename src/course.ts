export class Course {
    title: string;
    professor: string;
    schedule: IClassSchedule;

    constructor(title: string, professor: string, schedule: IClassSchedule) {
        this.title = title;
        this.professor = professor;
        this.schedule = schedule;
    }

    setSession(day: Day, session: ISession) {
        this.schedule[day] = session;
    }

    getSession(day: Day): ISession {
        return this.schedule[day];
    }

}

type HH = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23';
type MM = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
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
