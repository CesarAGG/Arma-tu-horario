type HH = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23';
type MM = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59';

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
export type Time = `${HH}:${MM}` | "24:00";

export function parseTime(time: Time): number {
    let timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    return hours * 60 + minutes;
}

export function numberToTime(number: number): Time {
    let hours = Math.floor(number / 60);
    let hoursHH = hours < 10 ? '0' + hours.toString() : hours.toString();
    let minutes = number % 60;
    let minutesMM = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    return <Time>`${hoursHH}:${minutesMM}`;
}
