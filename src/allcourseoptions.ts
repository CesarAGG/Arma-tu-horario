import { Course, IClassSchedule } from "./course";

/**
 * A class that contains every possible course schedule for a given course.
 */
export class AllCourseOptions {
    private _title: string;
    private _options: CourseOption[] = [];

    /**
     * This constructor will filter out any course schedules that do not have the given title.
     * 
     * @param courses An array of Course objects.
     * @param title The title of the course.
     */
    constructor(courses: Course[], title: string) {
        this._title = title;
        for (let course of courses) {
            if (course.title === this._title) {
                this._options.push(new CourseOption(course));
            }
        }
        if (this._options.length === 0) {
            throw new Error("No courses found with title " + this._title);
        }
    }

    /** options getter */
    public get options(): CourseOption[] {
        return this._options;
    }

    /**
     * Converts a CourseOption object at the given index to a Course object.
     * @param index The index of the CourseOption to return.
     * @returns A Course object.
     */
    public toCourse(index: number): Course {
        let option: CourseOption = this._options[index];
        return new Course(this._title, option.professor, option.classSchedule);
    }
}

/**
 * A class that contains a single course schedule without the title.
 */
class CourseOption {
    private _professor: string;
    private _classSchedule: IClassSchedule;

    /** classSchedule getter */
    public get classSchedule(): IClassSchedule {
        return this._classSchedule;
    }

    /** professor getter */
    public get professor(): string {
        return this._professor;
    }

    constructor(course: Course) {
        this._professor = course.professor;
        this._classSchedule = course.classSchedule;
    }
}
