import { Schedule } from "./schedule";
import { timeTableDrawer } from "./generatetimetable";

export class ScheduleSelectorGen {
    private static _generate(schedules: Schedule[]): void {
        let selectiondiv = document.getElementById("scheduleselection");
        selectiondiv.innerHTML = "";
        let form = document.createElement("form");
        form.setAttribute("id", "scheduleform");
        for (let schedule of schedules) {
            // First create the input element
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "schedule");
            input.setAttribute("value", schedules.indexOf(schedule).toString());
            input.setAttribute("id", "schedule" + schedules.indexOf(schedule).toString());
            form.appendChild(input);
            // Then the label
            let label = document.createElement("label");
            label.setAttribute("for", "Schedule" + schedules.indexOf(schedule).toString());
            label.innerHTML = schedules.indexOf(schedule).toString() + ": ";
            form.appendChild(label);
            // Then a line break
            let br = document.createElement("br");
            form.appendChild(br);
        }
        selectiondiv.appendChild(form);
        ScheduleSelectorGen.addTimeTableGenToButtons(schedules);
    }

    static generate(schedules: Schedule[]): void {
        window.setTimeout(function () {
            var element = document.getElementById("table");
            if (element) {
                ScheduleSelectorGen._generate(schedules);
            } else {
                ScheduleSelectorGen.generate(schedules);
            }
        }, 500)
    }

    static addTimeTableGenToButtons(schedules: Schedule[]): void {
        document.querySelectorAll("input[type=radio]").forEach(element => {
            element.addEventListener("click", function () {
                let schedule = schedules[parseInt(element.getAttribute("value"))];
                timeTableDrawer.drawSchedule(schedule, schedule.earliestStartTime, schedule.latestEndTime, schedule.interval);
                console.log("Clicked");
            });
        });
    }
}
