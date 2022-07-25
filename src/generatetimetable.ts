import { Schedule } from "./schedule";
import { Day, Time, parseTime, numberToTime } from "./mydaytime";

const DAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const nomenclature = {
    "07:00": "m1",
    "07:30": "m2",
    "08:00": "m3",
    "08:30": "m4",
    "09:00": "m5",
    "09:30": "m6",
    "10:00": "m7",
    "10:30": "m8",
    "11:00": "m9",
    "11:30": "m10",
    "12:00": "v1",
    "12:30": "v2",
    "13:00": "v3",
    "13:30": "v4",
    "14:00": "v5",
    "14:30": "v6",
    "15:00": "v7",
    "15:30": "v8",
    "16:00": "v9",
    "16:30": "v10",
    "17:00": "v11",
    "17:30": "v12",
    "18:00": "n1",
    "18:30": "n2",
    "19:00": "n3",
    "19:30": "n4",
    "20:00": "n5",
    "20:30": "n6",
    "21:00": "n7",
    "21:30": "n8"
}

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
        headerCell = document.createElement("th");
        headerCell.innerHTML = "Nom";
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
            timeCell.setAttribute("class", "timeCell");
            timeCell.innerHTML = numberToTime(i);
            row.appendChild(timeCell);

            let nomCell = document.createElement("td");
            nomCell.setAttribute("class", "nomCell");
            if (numberToTime(i) in nomenclature) {
                nomCell.innerHTML = (nomenclature as any)[numberToTime(i)]; // skip property checking since we are already doing it
            } else {
                nomCell.innerHTML = "N/A";
            }
            row.appendChild(nomCell);

            for (let day of DAYS) {
                if (matrix[DAYS.indexOf(day)][i / parseTime(interval)] !== null) {
                    let cell = document.createElement("td");
                    cell.setAttribute("class", "cell");
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
