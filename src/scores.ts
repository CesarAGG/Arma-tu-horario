import { Schedule } from "./schedule";
import { Day, Time, parseTime, numberToTime } from "./mydaytime";
let days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MODIFIER_VALUE = 0.95

export abstract class compactScore {
    /**
     * Returns the compactScore which is based on how close the startTime is to the endTime
     * overall. It also takes into account how many active days the schedule has, less active days\
     * means more compact.
     * 
     * @param schedule Schedule from which the score is calculated
     * @returns compactScore (from 0 to 1 inclusive)
     */
    static getScore(schedule: Schedule): string {
        let score = 1;
        let timeDiffs: number[] = [];

        for (let daySession of schedule.allDaySessions) {
            let startTime = parseTime(daySession.startTime);
            let endTime = parseTime(daySession.endTime);
            let timeDiff = endTime - startTime;
            timeDiffs.push(timeDiff);
            score -= timeDiff / 7 / 1440;
        }

        // small penalty for timediffs having a high variation
        let timeDiffVariation = Math.max(...timeDiffs) - Math.min(...timeDiffs);
        score -= timeDiffVariation / 7 / 1440;

        let activeDays = schedule.activeDays;
        let activeDaysModifier = MODIFIER_VALUE + (1 - MODIFIER_VALUE) * (activeDays / 6);
        score = score / activeDaysModifier;
        console.log(score);
        score = Math.round((compactScore.sigmoidFilter(score) * 100 + Number.EPSILON) * 100) / 100
        return score + "%";
    }

    private static sigmoidFilter(value: number): number {
        return 1 / (1 + Math.exp(-20.68 * (value - 0.69)));
    }
}
