import { Course, } from "./course";

export class Schedule {
    courses: Course[];

    constructor(courses: Course[]) {
        this.courses = courses;
        // Courses with the same title are not allowed so they must be filtered out.
        this.courses = this.courses.filter((course, index, self) => self.findIndex(c => c.title === course.title) === index);
    }

    getCoursesJSON(): any {
        return JSON.stringify(this.courses);
    }
}
