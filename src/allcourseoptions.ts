import { Course, IClassSchedule } from "./course";

export class AllCourseOptions {
    title: string;
    options: Option[] = [];
    constructor(courses: Course[], title: string) {
        this.title = title;
        for (let course of courses) {
            if (course.title === this.title) {
                this.options.push(new Option(course));
            }
        }
        if (this.options.length === 0) {
            throw new Error("No courses found with title " + this.title);
        }
    }
}

class Option {
    professor: string;
    classSchedule: IClassSchedule;

    toCourse(title: string) {
        return new Course(title, this.professor, this.classSchedule);
    }

    constructor(course: Course) {
        this.professor = course.professor;
        this.classSchedule = course.classSchedule;
    }
}
