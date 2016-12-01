import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MainComponent} from "./main.component";
import {MainRouting} from "./main.routing";
import {ListComponent} from "./list/list.component";
import {SettingComponent} from "./setting/setting.component";
import {AppDialogComponent} from "./dialog/app-dialog.component";
import {ChannelService} from "../_services/channel.service";
import {AuthenticationService} from "../_services/authentication.service";
import {CommonService} from "../_services/common.service";
import {ModalDialogModule} from "../modalDialog/modalDialog.module";
import {ReminderService} from "../_services/reminder.service";
import {ReminderItemComponent} from "./list/reminder-item/reminder-item.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        MainRouting,
        ModalDialogModule
    ],
    declarations:[
        MainComponent,
        ListComponent,
        SettingComponent,
        AppDialogComponent,
        ReminderItemComponent
    ],
    providers:[
        AuthenticationService,
        CommonService,
        ChannelService,
        ReminderService
    ]
})

export class MainModule{
}
