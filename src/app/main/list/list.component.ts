import {Component, OnInit} from "@angular/core";
import {ReminderService} from "../../_services/reminder.service";
import {Reminder} from "../../_model/reminder.model";

@Component({
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {

    reminders: Reminder[];

    date;

    datepickerOpts = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'D, d MM yyyy'
    };


    ngOnInit(): void {
        this.date = new Date();
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
