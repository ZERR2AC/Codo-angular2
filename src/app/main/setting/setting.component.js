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
var common_1 = require('@angular/common');
var channel_service_1 = require("../../_services/channel.service");
var authentication_service_1 = require("../../_services/authentication.service");
var modalDialog_component_1 = require("../../modalDialog/modalDialog.component");
var router_1 = require("@angular/router");
var SettingComponent = (function () {
    function SettingComponent(channelService, authenticationService, router, location) {
        this.channelService = channelService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.location = location;
        this.username = [];
        this.showDialog = false;
        this.myOwnchannels = [];
        this.mySubcribedChannels = [];
    }
    SettingComponent.prototype.ngOnInit = function () {
        this.getMyOwnChannels();
        this.getMySubscribedChannels();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
    };
    SettingComponent.prototype.getMyOwnChannels = function () {
        var _this = this;
        this.channelService.getMyOwnChannels().subscribe(function (res) {
            _this.myOwnchannels = res;
        }, function (err) {
            console.log("can not getMyOwnChannels, invalid token");
        });
    };
    SettingComponent.prototype.getMySubscribedChannels = function () {
        var _this = this;
        this.channelService.getSubscribeChannels().subscribe(function (res) {
            _this.mySubcribedChannels = res;
        }, function (err) {
            console.log("can not getMySubscribedChannels, Invalid token");
        });
    };
    SettingComponent.prototype.createNewChannel = function (event) {
        var _this = this;
        this.channelService.createChannel(event.target.value).subscribe(
        //successful create
        function (res) {
            _this.myOwnchannels.push(res.channel);
            event.target.value = "";
        }, function (err) {
            console.log("can not create new channel");
            _this.modal.showWithContent("can not create new channel");
        });
    };
    SettingComponent.prototype.unsubscribeChannel = function (channel) {
        var _this = this;
        channel.type = 0;
        var i = this.mySubcribedChannels.indexOf(channel);
        if (i != -1) {
            this.mySubcribedChannels.splice(i, 1);
        }
        this.channelService.unsubscribe(channel.id).subscribe(function (res) {
        }, function (err) {
            // can not unsubscribe
            console.log("fail to unsubscribe Channel");
            _this.modal.showWithContent("fail to unsubscribe Channel");
            channel.type = 2;
            _this.mySubcribedChannels.splice(i, 0, channel);
        });
    };
    SettingComponent.prototype.subscribeMoreBtnDidClick = function () {
        this.showDialog = !this.showDialog;
    };
    SettingComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(modalDialog_component_1.ModalDialogComponent), 
        __metadata('design:type', modalDialog_component_1.ModalDialogComponent)
    ], SettingComponent.prototype, "modal", void 0);
    SettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'setting.component.html',
            styleUrls: ['setting.component.css', '../main.component.css']
        }), 
        __metadata('design:paramtypes', [channel_service_1.ChannelService, authentication_service_1.AuthenticationService, router_1.Router, common_1.Location])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=setting.component.js.map