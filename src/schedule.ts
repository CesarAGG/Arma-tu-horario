import { Course, Day, Time, ISession } from "./course";

let days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export class Schedule {
    courses: Course[];

    constructor(courses: Course[]) {
        this.courses = courses;
        // I decided to first filter out the duplicate titles and then the overlapping sessions.
        // Mostly because sessions shouldn't even be overlapping in the first place if the input is validated.
        this.filterOutDuplicateCourses();
        this.filterOutOverlappingCourses();
    }

    getCoursesJSON(): any {
        return JSON.stringify(this.courses, null, 2);
    }

    // It's VERY important to add new courses at the start of the courses array.
    // Otherwise, the filterOut functions will delete the newly added course.

    /**
     * Filter out courses that have the same title as another course.
     */
    filterOutDuplicateCourses(): void {
        this.courses = this.courses.filter((course, index, self) => {
            let courseTitles = self.map(c => c.title);
            if (courseTitles.indexOf(course.title) !== index) {
                logFilterOut(course, "Duplicate title");
                return false;
            }
            return true;
        });
    }
    /**
     * Filter out courses with overlapping sessions using the function sessionOverlap().
     */
    filterOutOverlappingCourses(): void {
        for (let day of days) {
            this.courses = this.courses.filter((course, index, self) => {
                let courseSession = course.getSession(day);
                if (courseSession === undefined) {
                    return true;
                }
                for (let i = 0; i < index; i++) {
                    let otherCourseSession = self[i].getSession(day);
                    if (otherCourseSession === undefined) {
                        continue;
                    }
                    if (sessionOverlap(otherCourseSession, courseSession)) {
                        logFilterOut(course, "Overlapping sessions");
                        return false;
                    }
                }
                return true;
            });
        }
    }
}

function logFilterOut(course: Course, reason: string): void {
    console.log(`Course ${course.title} from professor ${course.professor} was filtered out. Reason: ${reason}. The schedule was:`);
    for (let day of days) {
        console.log(course.getSession(day) ? `${day}: ${course.getSession(day).startTime} - ${course.getSession(day).endTime}, ` : "");
    }
}

function parseTime(time: Time): number {
    let timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    return hours * 60 + minutes;
}

// This function might be useful in another file.
export function sessionOverlap(s1: ISession, s2: ISession): boolean {
    let s1Start = parseTime(s1.startTime);
    let s1End = parseTime(s1.endTime);
    let s2Start = parseTime(s2.startTime);
    let s2End = parseTime(s2.endTime);
    return s1Start < s2End && s2Start < s1End;
}
