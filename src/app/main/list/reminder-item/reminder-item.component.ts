import {Component, Input, EventEmitter, Output, AfterViewInit, ElementRef, Inject} from "@angular/core";
import {Reminder} from "../../../_model/reminder.model";
@Component({
    selector: 'reminder-item',
    templateUrl: 'reminder-item.component.html',
    styleUrls: ['reminder-item.component.css']
})


export class ReminderItemComponent implements AfterViewInit{
    ngAfterViewInit(): void {

        //init datetimepicker
        var i = $('.datetimepicker');
        this.datetimePicker = $(this.elementRef.nativeElement).find('.datetimepicker');
        this.datetimePicker.datetimepicker();
        if (this.reminder.due != undefined) {
            this.datetimePicker.data("DateTimePicker").date(this.reminder.due);
        }
        this.datetimePicker.on('dp.change',()=>{
            this.reminder.due = this.datetimePicker.data("DateTimePicker").date();
        });
    }
    @Input()
    reminder: Reminder;

    @Output()
    removeReminder: EventEmitter<Reminder> = new EventEmitter<Reminder>();

    elementRef:ElementRef;
    datetimePicker;

    constructor(@Inject(ElementRef) elementRef: ElementRef){
        this.elementRef = elementRef;
    }

    private Reminder: Reminder = new Reminder();

    changeid(){
        this.reminder.id =50;
    }

    priorityBtnDidClick(reminder:Reminder){
        reminder.priority+=1;
        reminder.priority%=3;
    }


    deleteReminder(){
        this.removeReminder.emit(this.reminder);
    }

}
