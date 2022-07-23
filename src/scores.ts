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
            let startTime = parseTime(daySession.startTime ?? "00:00");
            let endTime = parseTime(daySession.endTime ?? "00:00");
            let timeDiff = endTime - startTime;
            timeDiffs.push(timeDiff);
            score -= timeDiff / 7 / 1440;
        }

        // small penalty for timediffs having a high variation
        let timeDiffVariation = Math.max(...timeDiffs) - Math.min(...timeDiffs);
        score -= timeDiffVariation / 7 / 1440;

        // small penalty for inconsistent start times
        let latestStartTime: Time
        for (let daySession of schedule.allDaySessions) {
            if (daySession.startTime) {
                if (!latestStartTime || parseTime(daySession.startTime) > parseTime(latestStartTime)) {
                    latestStartTime = daySession.startTime;
                }
            }
        }
        let startTimeDiff = parseTime(latestStartTime) - parseTime(schedule.earliestStartTime);
        score -= startTimeDiff / 7 / 500;

        let activeDays = schedule.activeDays;
        let activeDaysModifier = MODIFIER_VALUE + (1 - MODIFIER_VALUE) * (activeDays / 6);
        score = score / activeDaysModifier;
        score = Math.round((compactScore.sigmoidFilter(score) * 100 + Number.EPSILON) * 100) / 100
        return score + "%";
    }

    private static sigmoidFilter(value: number): number {
        return 1 / (1 + Math.exp(-20.68 * (value - 0.69)));
    }
}
