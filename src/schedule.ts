import { Course, ISession, ICompleteSession } from "./course";
import { Day, Time, parseTime } from "./mydaytime";

let days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export class Schedule {
    courses: Course[];
    earliestStartTime: Time;
    latestEndTime: Time;
    allDaySessions: DaySessions[] = [];

    constructor(courses: Course[]) {
        this.courses = courses;
        // I decided to first filter out the duplicate titles and then the overlapping sessions.
        // Mostly because sessions shouldn't even be overlapping in the first place if the input is validated.
        this.filterOutDuplicateCourses();
        this.filterOutOverlappingCourses();
        this.setAllDaySessions();
    }

    getCoursesJSON(): any {
        return JSON.stringify(this.courses, null, 2);
    }

    // It's VERY important to add new courses at the start of the courses array.
    // Otherwise, the filterOut functions will delete the newly added course.

    addCourse(course: Course): void {
        this.courses.unshift(course);
        this.filterOutDuplicateCourses();
        this.filterOutOverlappingCourses();
        this.setAllDaySessions();
    }

    getDaySessions(day: Day): DaySessions {
        return new DaySessions(day, this.courses);
    }

    getAllDaySessions(): DaySessions[] {
        return this.allDaySessions;
    }

    private setAllDaySessions(): void {
        let allDaySessions: DaySessions[] = [];
        for (let day of days) {
            allDaySessions.push(this.getDaySessions(day));
        }
        this.allDaySessions = allDaySessions;
    }

    private setEarliestStartTime(): void {
        let earliestStartTime = parseTime("24:00");
        // TODO: finish this
    }

    /**
     * Filter out courses that have the same title as another course.
     */
    private filterOutDuplicateCourses(): void {
        this.courses = this.courses.filter((course, index, self) => {
            let courseTitles = self.map(c => c.title);
            if (courseTitles.indexOf(course.title) !== index) {
                Schedule.logFilterOut(course, "Duplicate title");
                return false;
            }
            return true;
        });
    }
    /**
     * Filter out courses with overlapping sessions using the function sessionOverlap().
     */
    private filterOutOverlappingCourses(): void {
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
                    if (Course.sessionOverlap(otherCourseSession, courseSession)) {
                        Schedule.logFilterOut(course, "Overlapping sessions", self[i]);
                        return false;
                    }
                }
                return true;
            });
        }
    }

    private static logFilterOut(course: Course, reason: string, otherCourse?: Course): void {
        if (reason === "Duplicate title") {
            console.log(`Course ${course.title} from professor ${course.professor} was filtered out in favor of another course with the same title.`);
        } else if (reason === "Overlapping sessions") {
            console.log(`Course ${course.title} from professor ${course.professor} was filtered out in favor of the overlapping course ${otherCourse.title} from professor ${otherCourse.professor}. The overlaps found were:`);
            for (let day of days) {
                // log the startTime and endTime of the course and the otherCourse
                let courseSession = course.getSession(day);
                let otherCourseSession = otherCourse.getSession(day);
                if (courseSession === undefined || otherCourseSession === undefined || !Course.sessionOverlap(courseSession, otherCourseSession)) {
                    continue;
                }
                console.log(`${day}: ${courseSession.startTime} - ${courseSession.endTime} overlapped by ${otherCourseSession.startTime} - ${otherCourseSession.endTime}`);
            }
        }
    }
}

class DaySessions {
    day: Day;
    // Sessions must be sorted by startTime.
    sessions: ICompleteSession[];
    startTime: Time;
    endTime: Time;

    constructor(day: Day, courses: Course[]) {
        this.day = day;
        this.sessions = [];
        for (let course of courses) {
            let session = course.getSession(day);
            if (session !== undefined) {
                this.sessions.push({ "startTime": session.startTime, "endTime": session.endTime, "title": course.title, "professor": course.professor });
            }
        }
        this.sortSessions();
        console.log(this);
        if (this.sessions.length > 0) {
            this.startTime = this.sessions[0].startTime;
            this.endTime = this.sessions[this.sessions.length - 1].endTime;
        } else {
            this.startTime = null;
            this.endTime = null;
        }
    }

    private sortSessions(): void {
        this.sessions.sort((s1, s2) => parseTime(s1.startTime) - parseTime(s2.startTime));
    }
}
