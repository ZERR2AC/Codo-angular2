/**
 * Created by zane on 11/27/16.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';

import {ModalDialogComponent} from "./modalDialog.component";
import {CommonModule} from "@angular/common";

@NgModule(
    {
        imports: [
            CommonModule
        ],
        declarations: [
            ModalDialogComponent
        ],
        exports: [
            ModalDialogComponent
        ]
    }
)

export class ModalDialogModule {
}