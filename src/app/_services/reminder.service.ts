import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response} from "@angular/http";
import {GlobalVariable} from "../global";
import {Reminder} from "../_model/reminder.model";
import {CommonService} from "./common.service";
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
        var params = this.commonService.userToken2params();
        return this.http.get(this.api_base + 'reminder', {search: params})
            .map((response: Response)=> {
                var res = response.json();
                return res;
            });
    }

    addReminder(){

    }



}
