/**
 * Created by zane on 11/25/16.
 */

import {
    Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges,
    AfterViewChecked
} from "@angular/core";
import {ChannelService} from "../../_services/channel.service";

declare var $: any;

@Component({
    templateUrl: 'dialogHtml.html',
    selector: 'app-dialog',
    styleUrls: ['dialog.component.css','../main.component.css']
})

export class AppDialogComponent implements OnInit,OnChanges,AfterViewChecked {
    ngAfterViewChecked(): void {
        if(this.visible){
            $(".more-subscription-dialog-container").animateCss("fadeInUp");
        }
    }

    @Input()
    visible: boolean;

    @Output()
    visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    isSubscribeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    private unsubscribeChannels = [];

    constructor(private channelService: ChannelService) {
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'].currentValue == true) {
            this.unsubscribeChannels = [];
            this.channelService.getUnsubscribeChannels().subscribe(
                res=>this.unsubscribeChannels = res,
                err=>err
            );
        }
    }

    close(): void {
        this.isSubscribeChanged.emit(true);

        let animationName = 'fadeOutDown';
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(".more-subscription-dialog-container").addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

        });

        setTimeout(()=>{
        this.visible = false;
        this.visibleChange.emit(this.visible);
        },700);

    }

    toggleSubscription(channel) {
        if (channel.type == 0) {
            this.subscribe(channel);
        } else if (channel.type == 2) {
            this.unsubscribe(channel);
        }
    }

    subscribe(channel): void {
        channel.type = 2;
        this.channelService.subscribe(channel.id).subscribe(
            res=> {
            },
            err=> {
                console.log("can not subscribe");
                channel.type = 0;
            }
        );
    }

    unsubscribe(channel): void {
        channel.type = 0;
        this.channelService.unsubscribe(channel.id).subscribe(
            res=> {
            },
            err=> {
                console.log("can not unsubscribe");
                channel.type = 2;

            }
        )
    }
}
