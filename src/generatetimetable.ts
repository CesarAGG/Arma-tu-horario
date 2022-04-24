import { Schedule } from "./schedule";
import { Day, Time, parseTime, numberToTime } from "./mydaytime";

const DAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
//TODO: this should be entered by the user in the UI, validate if the start time is before the end time
// and if the difference between the start and end time is a multiple of the interval
const INTERVAL: Time = "00:30"
const START_TIME: Time = "00:00";
const END_TIME: Time = "24:00";

function _drawSchedule(schedule: Schedule) {
    // Get the table div element and delete the old table
    let tablediv = document.getElementById("table");
    tablediv.innerHTML = "";

    let completeInterval = parseTime(END_TIME) - parseTime(START_TIME);
    let matrix = generateScheduleMatrix(schedule);
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
    for (let i = parseTime(START_TIME); i < parseTime(END_TIME); i += parseTime(INTERVAL)) {
        let row = document.createElement("tr");
        let timeCell = document.createElement("td");
        timeCell.setAttribute("id", "timeCell");
        timeCell.innerHTML = numberToTime(i);
        row.appendChild(timeCell);
        for (let day of DAYS) {
            if (matrix[DAYS.indexOf(day)][i / parseTime(INTERVAL)] !== null) {
                let cell = document.createElement("td");
                cell.setAttribute("id", "cell");
                for (let session of allSessions[DAYS.indexOf(day)].sessions) {
                    if (session.startTime == numberToTime(i)) {
                        cell.rowSpan = (parseTime(session.endTime) - i) / parseTime(INTERVAL);
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

function generateScheduleMatrix(schedule: Schedule) {
    let matrix: boolean[][] = [];
    for (let day of DAYS) {
        matrix[DAYS.indexOf(day)] = new Array((parseTime(END_TIME) - parseTime(START_TIME)) / parseTime(INTERVAL)).fill(false);
        for (let session of schedule.getDaySessions(day).sessions) {
            matrix[DAYS.indexOf(day)][parseTime(session.startTime) / parseTime(INTERVAL)] = true;
            for (let i = 1; i < (parseTime(session.endTime) - parseTime(session.startTime)) / parseTime(INTERVAL); i++) {
                matrix[DAYS.indexOf(day)][parseTime(session.startTime) / parseTime(INTERVAL) + i] = null;
            }
        }
    }
    return matrix;
}

export function drawSchedule(schedule: Schedule): void {
    window.setTimeout(function () {
        var element = document.getElementById("table");
        if (element) {
            _drawSchedule(schedule);
        } else {
            drawSchedule(schedule);
        }
    }, 500)
}
