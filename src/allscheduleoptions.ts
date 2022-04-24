import { AllCourseOptions } from "./allcourseoptions";
import { Course } from "./course";
import { Schedule } from "./schedule";

let allTitles: string[] = [];

/**
 * Returns an array of objects of class Schedule that represents every schedule that
 * follows the following two conditions:
 * 1. Every single course must be included ONLY once in every schedule.
 * 2. No two courses may have overlapping sessions.
 * 
 * Warning: This function uses brute force to find all possible combinations. Running this with
 * a large number of courses WILL crash your browser. A large number of options, however, is fine.
 * 
 * @param courses An array of Course objects.
 * @return An array of Schedule objects.
 */
export function allScheduleOptions(courses: Course[]): Schedule[] {
    let allCourseOptions: { [key: string]: AllCourseOptions } = {};
    for (let course of courses) {
        if (!(course.title in allCourseOptions)) {
            allCourseOptions[course.title] = new AllCourseOptions(courses, course.title);
        }
    }
    allTitles = Object.keys(allCourseOptions);

    console.log(allTitles);
    console.log(allCourseOptions);

    let j = 1;
    for (let option of allTitles) {
        j *= allCourseOptions[option].options.length;
    }
    let schedules: Schedule[] = [];
    for (let i = 0; i < j; i++) {
        schedules.push(new Schedule([]));
    }

    console.log(j);
    buildSchedules(j, schedules, allCourseOptions, allTitles[0]);
    // purge all elements that are not the same length as allOptions.length
    for (let schedule of schedules) {
        if (schedule.courses.length !== allTitles.length) {
            schedule.courses.pop();
        }
    }

    return schedules;
}

function buildSchedules(sub: number, schedules: Schedule[], allCourseOptions: { [key: string]: AllCourseOptions }, currentCourse: string): void {
    let i = allTitles.indexOf(currentCourse);
    console.log(currentCourse);

    let k = -1;
    for (let j = 0; j < schedules.length; j++) {
        if (j % (sub / allCourseOptions[currentCourse].options.length) === 0) {
            k++;
            k %= allCourseOptions[currentCourse].options.length;
        }
        console.log(k + "added");
        schedules[j].addCourse(allCourseOptions[currentCourse].options[k].toCourse(currentCourse));
    }
    console.log(schedules);

    if (i < allTitles.length - 1) {
        buildSchedules(sub / allCourseOptions[currentCourse].options.length, schedules, allCourseOptions, allTitles[i + 1]);
    }
    else {
        console.log("Done");
    }
}
