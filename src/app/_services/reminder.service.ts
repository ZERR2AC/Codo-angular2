import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response, Headers} from "@angular/http";
import {GlobalVariable} from "../global";
import {Reminder} from "../_model/reminder.model";
import {CommonService} from "./common.service";
import * as moment from 'moment';
/**
 * Created by zane on 11/29/16.
 */

@Injectable()
export class ReminderService {
    private api_base = "";

    constructor(private router: Router,
                private http: Http,
                private commonService: CommonService) {
        this.api_base = GlobalVariable.BASE_API_URL;
    }

    getAllReminder() {
        let params = this.commonService.userToken2params();
        let self = this;
        return this.http.get(this.api_base + 'reminder', {search: params})
            .map((response: Response)=> {
                var res = response.json();
                self.transformReminder(res.reminders);
                return res;
            });
    }

    transformReminder(reminders: Reminder[]) {
        reminders.forEach(function (reminder) {
            if (reminder.due != undefined) {
                //transform due date to Moment obejct;
                reminder.due = moment(reminder.due);
            }
        })
    }

    addReminder(reminder: Reminder) {
        let params = this.commonService.userToken2params();
        let header = this.commonService.constructFormHeader();
        var bodyParams = this.commonService.getBodyParams({
            'title': reminder.title,
            'content': reminder.content,
            'priority': reminder.priority,
            'type': reminder.type,
            'channel_id': reminder.channel_id
        });

        if (reminder.due != null) {
            bodyParams.append('due', moment(reminder.due).format('YYYY-MM-DD HH:mm:ss'));
        }

        let body = bodyParams.toString();
        let self = this;
        return this.http.post(this.api_base + 'reminder', body,
            {
                search: params,
                headers: header
            }).map((response: Response)=> {
            var res = response.json();
            if (res.ret == 0) {
                if (res.reminder.due == "") {
                    res.reminder.due = undefined;
                }
                self.transformReminder([res.reminder]);
                return res;
            } else {
                throw new Error(res.ret);
            }
        })

    }

    deleteReminder(reminder: Reminder) {
        let params = this.commonService.userToken2params();
        return this.http.delete(this.api_base + 'reminder/' + reminder.id,
            {
                search: params
            }).map((response: Response)=> {
            var res = response.json();
            if (res.ret == 0) {
                return res;
            } else {
                throw Error(res.ret);
            }
        })
    }

    updateReminder(reminder: Reminder) {
        let params = this.commonService.userToken2params();
        let header = this.commonService.constructFormHeader();
        let currentUserId = JSON.parse(localStorage.getItem("currentUser")).user.id;
        var bodyParams = this.commonService.getBodyParams({});

        if (currentUserId == reminder.creator_id) {
            //my own
            bodyParams = this.commonService.getBodyParams({
                'title': reminder.title,
                'content': reminder.content,
                'due': moment(reminder.due).format('YYYY-MM-DD HH:mm:ss'),
                'priority': reminder.priority,
                'state': reminder.state
            });
        } else {
            //receive
            bodyParams = this.commonService.getBodyParams({
                'state': reminder.state
            });
            if (reminder.remark != undefined) {
                bodyParams.append('remark', reminder.remark);
            }
        }

        let body = bodyParams.toString();
        return this.http.post(this.api_base + 'reminder/' + reminder.id, body,
            {
                search: params,
                headers: header
            }).map((response: Response)=> {
            var res = response.json();
            if (res.ret == 0) {
                // update successful
                return res;
            } else {
                throw new Error(res.ret);
            }
        });


    }

}
