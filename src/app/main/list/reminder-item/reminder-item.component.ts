import {
    Component, Input, EventEmitter, Output, AfterViewInit, ElementRef, Inject, AfterContentInit, AfterViewChecked
} from "@angular/core";
import {Reminder} from "../../../_model/reminder.model";

@Component({
    selector: 'reminder-item',
    templateUrl: 'reminder-item.component.html',
    styleUrls: ['reminder-item.component.css', '../list.component.css']
})


export class ReminderItemComponent implements AfterViewInit,AfterViewChecked {
    // for auto increase textarea
    ngAfterViewChecked(): void {
        this.allTextArea.each(function () {
            this.style.height = "0px";
            this.style.height = (this.scrollHeight) + "px";
        });
    }

    ngAfterViewInit(): void {
        //init datetimepicker
        this.datetimePicker = $(this.elementRef.nativeElement).find('.datetimepicker-input');
        this.datetimePicker.datetimepicker();

        var dtdate = this.datetimePicker.data("DateTimePicker");
        if (this.reminder.due != undefined) {
            this.datetimePicker.data("DateTimePicker").date(this.reminder.due);
        }
        this.datetimePicker.on('dp.change', ()=> {
            this.reminder.due = dtdate.date();
        });
        dtdate.defaultDate(false);
        dtdate.useCurrent('day');
        dtdate.showClear(true);

        //init textarea
        this.allTextArea = $(this.elementRef.nativeElement).find('.my-textarea');
        this.allTextArea.each(function () {
            this.setAttribute('style', 'overflow-y:hidden;');
        });

        let self = this;
        $(window).on('resize', function () {
            self.ngAfterViewChecked();
        });

    }

    @Input()
    reminder: Reminder;

    @Output()
    removeReminder: EventEmitter<Reminder> = new EventEmitter<Reminder>();

    @Output()
    reminderUpdated: EventEmitter<Reminder> = new EventEmitter<Reminder>();


    elementRef: ElementRef;
    datetimePicker;
    allTextArea;

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    private Reminder: Reminder = new Reminder();

    priorityBtnDidClick(reminder: Reminder) {
        reminder.priority += 1;
        reminder.priority %= 3;
        this.updateReminder();
    }


    deleteReminder() {
        this.removeReminder.emit(this.reminder);
    }

    updateReminder() {
        console.log("update reminder");
        this.reminderUpdated.emit(this.reminder);
    }

    test() {
        console.log('here');
    }
}
