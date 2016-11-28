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
var router_1 = require("@angular/router");
var authentication_service_1 = require("../_services/authentication.service");
var modalDialog_component_1 = require("../modalDialog/modalDialog.component");
var MainComponent = (function () {
    function MainComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    MainComponent.prototype.ngOnInit = function () {
        this.checkConnection();
    };
    MainComponent.prototype.logout = function () {
        this.authenticationService.logout();
    };
    MainComponent.prototype.checkConnection = function () {
        var _this = this;
        this.authenticationService.checkConnection().subscribe(function (res) { return res; }, function (err) {
            _this.modal.showWithContent("Network error!!! please refresh and try it later");
        });
    };
    __decorate([
        core_1.ViewChild(modalDialog_component_1.ModalDialogComponent), 
        __metadata('design:type', modalDialog_component_1.ModalDialogComponent)
    ], MainComponent.prototype, "modal", void 0);
    MainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'main.component.html',
            styleUrls: ['main.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map