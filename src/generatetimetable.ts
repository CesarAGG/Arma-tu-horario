import { Schedule } from "./schedule";
import { Day, Time, parseTime, numberToTime } from "./mydaytime";

const DAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// const interval: Time = "00:30"
// const startTime: Time = "00:00";
// const endTime: Time = "24:00";
export abstract class timeTableDrawer {
    private static _drawSchedule(schedule: Schedule, startTime: Time, endTime: Time, interval: Time) {
        // Get the table div element and delete the old table
        let tablediv = document.getElementById("table");
        tablediv.innerHTML = "";

        let completeInterval = parseTime(endTime) - parseTime(startTime);
        let matrix = timeTableDrawer.generateScheduleMatrix(schedule, startTime, endTime, interval);
        let allSessions = schedule.getAllDaySessions();

        // Create the table
        let table = document.createElement("table");
        table.setAttribute("id", "timeTable");

        // Generate the table headerRow
        let headerRow = document.createElement("tr");
        headerRow.setAttribute("id", "headerRow");
        let headerCell = document.createElement("th");
        headerCell.innerHTML = "Time";
        headerRow.appendChild(headerCell);
        for (let day of DAYS) {
            headerCell = document.createElement("th");
            headerCell.innerHTML = day;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Generate the table body
        for (let i = parseTime(startTime); i < parseTime(endTime); i += parseTime(interval)) {
            let row = document.createElement("tr");
            let timeCell = document.createElement("td");
            timeCell.setAttribute("id", "timeCell");
            timeCell.innerHTML = numberToTime(i);
            row.appendChild(timeCell);
            for (let day of DAYS) {
                if (matrix[DAYS.indexOf(day)][i / parseTime(interval)] !== null) {
                    let cell = document.createElement("td");
                    cell.setAttribute("id", "cell");
                    for (let session of allSessions[DAYS.indexOf(day)].sessions) {
                        if (session.startTime == numberToTime(i)) {
                            cell.rowSpan = (parseTime(session.endTime) - i) / parseTime(interval);
                            cell.innerHTML = session.title + " " + session.professor;
                            break;
                        }
                    }
                    row.appendChild(cell);
                }

                table.appendChild(row);
            }

            // Append the table to the table div
            tablediv.appendChild(table);
        }
    }

    private static generateScheduleMatrix(schedule: Schedule, startTime: Time, endTime: Time, interval: Time): boolean[][] {
        let matrix: boolean[][] = [];
        for (let day of DAYS) {
            matrix[DAYS.indexOf(day)] = new Array((parseTime(endTime) - parseTime(startTime)) / parseTime(interval)).fill(false);
            for (let session of schedule.getDaySessions(day).sessions) {
                matrix[DAYS.indexOf(day)][parseTime(session.startTime) / parseTime(interval)] = true;
                for (let i = 1; i < (parseTime(session.endTime) - parseTime(session.startTime)) / parseTime(interval); i++) {
                    matrix[DAYS.indexOf(day)][parseTime(session.startTime) / parseTime(interval) + i] = null;
                }
            }
        }
        return matrix;
    }

    static drawSchedule(schedule: Schedule, startTime: Time, endTime: Time, interval: Time): void {
        window.setTimeout(function () {
            var element = document.getElementById("table");
            if (element) {
                timeTableDrawer._drawSchedule(schedule, startTime, endTime, interval);
            } else {
                timeTableDrawer.drawSchedule(schedule, startTime, endTime, interval);
            }
        }, 500)
    }

}
