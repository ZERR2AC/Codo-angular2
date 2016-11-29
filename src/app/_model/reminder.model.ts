/**
 * Created by zane on 11/29/16.
 */
export class Reminder {
    static PRIORITY_LOW = 0;
    static PRIORITY_MID = 1;
    static PRIORITY_HIGH = 2;

    channel_id: number = null;
    title: string = "";
    content: string = "";
    due: Date = new Date();
    id: number = null;
    priority: number = 0;
    type: number = 0;
    creater_id: number = null;
    state: number = 0;
}
