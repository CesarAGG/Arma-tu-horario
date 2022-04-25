import { Course } from "./course";
import { Schedule } from "./schedule";

/**
 * Reads a JSON file and returns an array of Course objects.
 * 
 */
export function courseArrayFromJSON(json: unknown[]): Course[] {
    let courses: Course[] = [];
    for (let element of json) {
        courses.push(Object.assign(Object.create(Course.prototype), element));
    }
    return courses;
}

export function scheduleArrayFromJSON(json: unknown[]): Schedule[] {
    let schedules: Schedule[] = [];
    for (let element of json) {
        schedules.push(Object.assign(Object.create(Schedule.prototype), element));
    }
    return schedules;
}
