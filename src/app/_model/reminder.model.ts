import * as moment from 'moment';
import Moment = moment.Moment;

/**
 * Created by zane on 11/29/16.
 */
export class Reminder {
    PRIORITY_LOW = 0;
    PRIORITY_MID = 1;
    PRIORITY_HIGH = 2;

    channel_id: number = null;
    title: string = "";
    content: string = "";
    due:Moment;
    id: number = null;
    priority: number = 0;
    type: number = 1;
    creater_id: number = null;
    state: number = 0;

}
