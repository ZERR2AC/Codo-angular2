import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms'
import {AppComponent}   from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {HttpModule} from "@angular/http";
import {CommonService} from "./_services/common.service";
import {ModalDialogModule} from "./modalDialog/modalDialog.module";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        ModalDialogModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        CommonService
    ]
})

export class AppModule {
}
