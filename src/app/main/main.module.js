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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var main_component_1 = require("./main.component.ts");
var main_routing_1 = require("./main.routing.ts");
var list_component_1 = require("./list/list.component.ts");
var setting_component_1 = require("./setting/setting.component.ts");
var app_dialog_component_1 = require("./dialog/app-dialog.component.ts");
var channel_service_1 = require("../_services/channel.service");
var authentication_service_1 = require("../_services/authentication.service");
var common_service_1 = require("../_services/common.service");
var modalDialog_module_1 = require("../modalDialog/modalDialog.module");
var MainModule = (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                main_routing_1.MainRouting,
                modalDialog_module_1.ModalDialogModule
            ],
            declarations: [
                main_component_1.MainComponent,
                list_component_1.ListComponent,
                setting_component_1.SettingComponent,
                app_dialog_component_1.AppDialogComponent
            ],
            providers: [
                authentication_service_1.AuthenticationService,
                common_service_1.CommonService,
                channel_service_1.ChannelService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map
