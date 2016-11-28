/**
 * Created by zane on 11/25/16.
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
var channel_service_1 = require("../../_services/channel.service");
var AppDialogComponent = (function () {
    function AppDialogComponent(channelService) {
        this.channelService = channelService;
        this.visibleChange = new core_1.EventEmitter();
        this.isSubscribeChanged = new core_1.EventEmitter();
        this.unsubscribeChannels = [];
    }
    AppDialogComponent.prototype.ngAfterViewChecked = function () {
        if (this.visible) {
            $(".more-subscription-dialog-container").animateCss("fadeInUp");
        }
    };
    AppDialogComponent.prototype.ngOnInit = function () {
    };
    AppDialogComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.visible.currentValue == true) {
            this.unsubscribeChannels = [];
            this.channelService.getUnsubscribeChannels().subscribe(function (res) { return _this.unsubscribeChannels = res; }, function (err) { return err; });
        }
    };
    AppDialogComponent.prototype.close = function () {
        var _this = this;
        this.isSubscribeChanged.emit(true);
        var animationName = 'fadeOutDown';
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(".more-subscription-dialog-container").addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
        setTimeout(function () {
            _this.visible = false;
            _this.visibleChange.emit(_this.visible);
        }, 700);
    };
    AppDialogComponent.prototype.toggleSubscription = function (channel) {
        if (channel.type == 0) {
            this.subscribe(channel);
        }
        else if (channel.type == 2) {
            this.unsubscribe(channel);
        }
    };
    AppDialogComponent.prototype.subscribe = function (channel) {
        channel.type = 2;
        this.channelService.subscribe(channel.id).subscribe(function (res) {
        }, function (err) {
            console.log("can not subscribe");
            channel.type = 0;
        });
    };
    AppDialogComponent.prototype.unsubscribe = function (channel) {
        channel.type = 0;
        this.channelService.unsubscribe(channel.id).subscribe(function (res) {
        }, function (err) {
            console.log("can not unsubscribe");
            channel.type = 2;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppDialogComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AppDialogComponent.prototype, "visibleChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AppDialogComponent.prototype, "isSubscribeChanged", void 0);
    AppDialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'dialogHtml.html',
            selector: 'app-dialog',
            styleUrls: ['dialog.component.css', '../main.component.css']
        }), 
        __metadata('design:paramtypes', [channel_service_1.ChannelService])
    ], AppDialogComponent);
    return AppDialogComponent;
}());
exports.AppDialogComponent = AppDialogComponent;
//# sourceMappingURL=app-dialog.component.js.map