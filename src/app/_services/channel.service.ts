import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, URLSearchParams, RequestOptions, Response} from "@angular/http";
import {GlobalVariable} from "../global";
import {Observable} from "rxjs";
import {CommonService} from "./common.service";
import {AuthenticationService} from "./authentication.service";

import 'rxjs/Rx';

@Injectable()
export class ChannelService {
    private api_base = "";

    constructor(private router: Router,
                private http: Http,
                private commonService: CommonService,
                private authenticationService: AuthenticationService) {
        this.api_base = GlobalVariable.BASE_API_URL;
    }

    private getChannelNameWithType(type: number) {
        var params = this.commonService.userToken2params();
        params.append('type', type.toString());
        return this.http.get(this.api_base + 'channel', {search: params})
            .map((response: Response)=> {
                    var res = response.json();
                    if (res.ret == 0) {
                        return res.channels;
                    } else {
                        this.errorHandler(res.ret);
                        throw new Error(res.ret);
                    }
                }
            );
    }

    getSubscribeChannels() {
        return this.getChannelNameWithType(2);
    }

    getUnsubscribeChannels() {
        return this.getChannelNameWithType(0);
    }

    getMyOwnChannels() {
        return this.getChannelNameWithType(1);
    }

    createChannel(name: string) {
        var params = this.commonService.userToken2params();
        var headers = this.commonService.constructFormHeader();

        let body = this.commonService.getBody({'name': name});

        return this.http.post(this.api_base + 'channel',
            body,
            {
                search: params,
                headers: headers
            }).map((response: Response)=> {
            var res = response.json();
            if (res.ret == 0) {
                //OK
                return res;
            } else {
                // ==1 channel name has been used
                this.errorHandler(res.ret);
                throw new Error(res.ret);
            }
        });
    }

    userSubscribeAction(channelId: number, type) {
        let params = this.commonService.userToken2params();
        let headers = this.commonService.constructFormHeader();
        let body = this.commonService.getBody({'action': type});

        return this.http.post(this.api_base + 'channel/' + channelId,
            body,
            {
                search: params,
                headers: headers
            }).map((response: Response)=> {
            var res = response.json();
            if (res.ret == 0) {
                //OK
                return res;
            } else {
                //fail
                this.errorHandler(res.ret);
                throw new Error(res.ret);
            }
        });
    }

    subscribe(channelId: number) {
        return this.userSubscribeAction(channelId, 0);
    }

    unsubscribe(channelId: number) {
        return this.userSubscribeAction(channelId, 1);
    }

    errorHandler(errCode: number) {
        if (errCode == 10) {
            // invalid token
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        } else if (errCode == 20) {
            //can not subscribe or unsubscribe a channel
        }
    }
}
