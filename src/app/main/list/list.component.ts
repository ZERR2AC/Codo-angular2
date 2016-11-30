import {Component, OnInit} from "@angular/core";
import {ReminderService} from "../../_services/reminder.service";
import {Reminder} from "../../_model/reminder.model";
import {ChannelService} from "../../_services/channel.service";

declare var $: any;

@Component({
    templateUrl: 'list.component.html',
    styleUrls:['list.component.css']
})

export class ListComponent implements OnInit {

    reminders: Reminder[];
    newReminder: Reminder = new Reminder();
    myOwnChannels = [];

    datepickerOpts = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'D, d MM yyyy'
    };


    ngOnInit(): void {
        //get all reminder
        this.reminderService.getAllReminder().subscribe(
            res => {
                this.reminders = res.reminders;
                $('.selectpicker').selectpicker('render');
                $('.selectpicker').on('show.bs.select', function () {
                    $(this).selectpicker('refresh');
                });

                $('.selectpicker').on('changed.bs.select', function (e) {
                    var selectedChannel = $(e.currentTarget).val();
                    console.log(selectedChannel);
                });
            },
            err => console.log(err)
        );
        //get all my channels
        this.channelService.getMyOwnChannels().subscribe(
            res=>{
                this.myOwnChannels = res;
            },
            err => console.log(err)
        )

    }


    constructor(private reminderService: ReminderService,
                private channelService: ChannelService) {
    }

}
