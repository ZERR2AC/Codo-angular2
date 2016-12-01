import {Component, OnInit, AfterViewChecked, AfterViewInit} from "@angular/core";
import {ReminderService} from "../../_services/reminder.service";
import {Reminder} from "../../_model/reminder.model";
import {ChannelService} from "../../_services/channel.service";
import * as moment from 'moment';

declare var $: any;

@Component({
    templateUrl: 'list.component.html',
    styleUrls:['list.component.css']
})

export class ListComponent implements OnInit,AfterViewInit{

    ngAfterViewInit(): void {

        //init new reminder due date picker
        this.datetimepicker = $('#datetimepicker');
        $('#datetimepicker').datetimepicker();
        this.datetimepicker.on('dp.change',()=>{
            this.newReminder.due = this.datetimepicker.data("DateTimePicker").date();
        });
    }

    private Reminder:Reminder = new Reminder();
    reminders: Reminder[];
    newReminder: Reminder = new Reminder();
    myOwnChannels = [];
    datetimepicker ;

    constructor(private reminderService: ReminderService,
                private channelService: ChannelService) {
    }


    ngOnInit(): void {
        //get all reminder
        this.reminderService.getAllReminder().subscribe(
            res => {
                this.reminders = res.reminders;

                $('.selectpicker').selectpicker('render');
                $('.selectpicker').on('show.bs.select', function () {
                    $(this).selectpicker('refresh');
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

    priorityBtnDidClick(reminder:Reminder){
        reminder.priority+=1;
        reminder.priority%=3;
    }

    submitNewReminder(){
        this.newReminder.channel_id = $(".selectpicker").val();
        this.newReminder.type = this.newReminder.channel_id.toString()=='null'? 1:0;

        var tempReminder = this.newReminder;
        this.newReminder = new Reminder();
        var oldDateTimePickerValue = this.datetimepicker.data("DateTimePicker").date();
        this.datetimepicker.data("DateTimePicker").clear();

        // add the reminder first for better user experience
        this.reminders.splice(0,0,tempReminder);

        this.reminderService.addReminder(tempReminder).subscribe(
            res=>{
                var newReminder:Reminder = res.reminder;
                var i = this.reminders.indexOf(tempReminder);
                if (i != -1) {
                    this.reminders.splice(i,1,newReminder);
                    console.log(this.reminders[i]);
                }
            },
            err=>{
                console.log(err);
                var i = this.reminders.indexOf(tempReminder);
                if (i != -1) {
                    this.reminders.splice(i,1);
                    this.newReminder = tempReminder;
                    this.datetimepicker.data("DateTimePicker").date(oldDateTimePickerValue);
                }
            }
        )
    }

    deleteReminder(reminder:Reminder){
        var i = this.reminders.indexOf(reminder);
        if (i != -1) {
            this.reminders.splice(i,1);
        }
        this.reminderService.deleteReminder(reminder).subscribe(
            res=>{
            },
            err=>{
                console.log(err);
                this.reminders.splice(i,0,reminder);
            }
        )
    }

    updateReminder(reminder:Reminder){
        this.reminderService.updateReminder(reminder).subscribe(
            res=>{
                //successfully update
                console.log("successful");
            },
            err=>{
                console.log(err);
            }
        )
    }

    test(){
        console.log('hahaha');
    }
}
