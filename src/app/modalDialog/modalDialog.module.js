/**
 * Created by zane on 11/27/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var modalDialog_component_1 = require("./modalDialog.component.ts");
var common_1 = require("@angular/common");
var ModalDialogModule = (function () {
    function ModalDialogModule() {
    }
    ModalDialogModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                modalDialog_component_1.ModalDialogComponent
            ],
            exports: [
                modalDialog_component_1.ModalDialogComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalDialogModule);
    return ModalDialogModule;
}());
exports.ModalDialogModule = ModalDialogModule;
//# sourceMappingURL=modalDialog.module.js.map
