import { Course, Day } from "./course";

export class Schedule {
    courses: Course[];

    constructor(courses: Course[]) {
        this.courses = courses;
        // Courses with the same title are not allowed so they must be filtered out.
        // The console logs the course that was filtered out.
        this.courses = this.courses.filter((course, index, self) => {
            let courseTitles = self.map(c => c.title);
            if (courseTitles.indexOf(course.title) !== index) {
                logFilterOut(course, "Duplicate title");
                return false;
            }
            return true;
        });
    }

    getCoursesJSON(): any {
        return JSON.stringify(this.courses);
    }

}

function logFilterOut(course: Course, reason: string): void {
    console.log(`Course ${course.title} from professor ${course.professor} was filtered out. Reason: ${reason}. The schedule was:`);
    let days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    for (let day of days) {
        console.log(course.getSession(day) ? `${day}: ${course.getSession(day).startTime} - ${course.getSession(day).endTime}, ` : "");
    }
}
