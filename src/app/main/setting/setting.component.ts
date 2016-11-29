import {Component, OnInit, ViewChild} from "@angular/core";
import {Location} from '@angular/common';
import {ChannelService} from "../../_services/channel.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {ModalDialogComponent} from "../../modalDialog/modalDialog.component";
import {Router} from "@angular/router";
declare var $: any;

@Component({
    templateUrl: 'setting.component.html',
    styleUrls: ['setting.component.css', '../main.component.css']
})

export class SettingComponent implements OnInit {
    @ViewChild(ModalDialogComponent)
    public modal: ModalDialogComponent;

    username: string = "";
    newChannelName: string = "";

    ngOnInit(): void {
        this.getMyOwnChannels();
        this.getMySubscribedChannels();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
    }

    showDialog = false;
    private myOwnchannels = [];
    private mySubcribedChannels = [];

    constructor(private channelService: ChannelService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private location: Location) {
    }

    getMyOwnChannels() {
        this.channelService.getMyOwnChannels().subscribe(
            (res)=> {
                this.myOwnchannels = res;
            },
            err=> {
                console.log("can not getMyOwnChannels, invalid token");
            }
        );
    }

    getMySubscribedChannels() {
        this.channelService.getSubscribeChannels().subscribe(
            (res)=> {
                this.mySubcribedChannels = res;
            },
            err=> {
                console.log("can not getMySubscribedChannels, Invalid token");
            }
        );
    }

    createNewChannel(){
        this.channelService.createChannel(this.newChannelName).subscribe(
            //successful create
            res=> {
                this.myOwnchannels.push(res.channel);
                this.newChannelName = "";
            },
            err=> {
                if (err.message == 1) {
                    console.log("channel name has benn used.");
                    //change the UI to show warning

                }
            });
    }
    unsubscribeChannel(channel): void {
        channel.type = 0;
        let i = this.mySubcribedChannels.indexOf(channel);
        if (i != -1) {
            this.mySubcribedChannels.splice(i, 1);
        }

        this.channelService.unsubscribe(channel.id).subscribe(
            res=> {
            },
            err => {
                // can not unsubscribe
                if (err.message == 20) {
                    console.log("fail to unsubscribe Channel");
                    this.modal.showWithContent("fail to unsubscribe Channel");
                    channel.type = 2;
                    this.mySubcribedChannels.splice(i, 0, channel);
                }

            }
        )
    }

    subscribeMoreBtnDidClick() {
        this.showDialog = !this.showDialog;
    }

    back() {
        this.location.back();
    }


}
