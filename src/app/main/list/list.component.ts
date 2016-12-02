import {Component, OnInit, AfterViewChecked, AfterViewInit} from "@angular/core";
import {ReminderService} from "../../_services/reminder.service";
import {Reminder} from "../../_model/reminder.model";
import {ChannelService} from "../../_services/channel.service";
import * as moment from 'moment';

declare var $: any;

@Component({
    templateUrl: 'list.component.html',
    styleUrls:['list.component.css','../main.component.css']
})

export class ListComponent implements OnInit,AfterViewInit,AfterViewChecked{

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

    ngAfterViewChecked(): void {
        // for auto increase textarea
        var allTextArea = $('.my-textarea');
        allTextArea.each(function () {
            this.style.height = "0px";
            this.style.height = (this.scrollHeight) + "px";
        });
    }

    ngAfterViewInit(): void {

        //init new reminder due date picker
        this.datetimepicker = $('#create-reminder-datetimepicker');
        $('#create-reminder-datetimepicker').datetimepicker();
        var dtdate =  this.datetimepicker.data("DateTimePicker");
        this.datetimepicker.on('dp.change',()=>{
            this.newReminder.due = dtdate.date();
        });

        dtdate.defaultDate(false);
        dtdate.useCurrent('day');
        dtdate.showClear(true);

        //text area height after resize
        let self = this;
        $(window).on('resize', function () {
            self.ngAfterViewChecked();
        });

        //new reminder collapse expand
        let newReminderDiv = $('#create-reminder');
        newReminderDiv.click(()=>{
            let collpaseDiv = newReminderDiv.find('.create-reminder-collapse');
            if (collpaseDiv.css('display') == 'none') {
                collpaseDiv.slideDown(300,function(){
                    $('select').selectpicker('render');
                    $('select').on('show.bs.select', function () {
                        $(this).selectpicker('refresh');
                    });
                    collpaseDiv.removeClass('collapse-hide');
                });
            }
        });
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

    stopPropagationFilter(e){
        var channelSelect = $('#create-reminder-channel-select');
        var needStop = e.path.indexOf(channelSelect[0])==-1;
        if (needStop) {
            e.stopPropagation();
        }
    }

    test(){
        console.log('hahaha');
    }
}
