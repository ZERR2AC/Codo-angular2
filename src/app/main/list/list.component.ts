import {Component, OnInit} from "@angular/core";
import {ReminderService} from "../../_services/reminder.service";
import {Reminder} from "../../_model/reminder.model";

@Component({
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {

    reminders: Reminder[];

    date;

    ngOnInit(): void {
        this.reminderService.getAllReminder().subscribe(
            res => {
                this.reminders = res.reminders;
            },
            err => console.log(err)
        );
    }


    constructor(private reminderService: ReminderService) {
    }

    click(){
        console.log(this.date.getTime());
    }

}
