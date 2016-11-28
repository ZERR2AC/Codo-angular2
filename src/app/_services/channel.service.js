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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require("@angular/http");
var global_1 = require("../global");
var common_service_1 = require("./common.service.ts");
var authentication_service_1 = require("./authentication.service.ts");
require('rxjs/Rx');
var ChannelService = (function () {
    function ChannelService(router, http, commonService, authenticationService) {
        this.router = router;
        this.http = http;
        this.commonService = commonService;
        this.authenticationService = authenticationService;
        this.api_base = "";
        this.api_base = global_1.GlobalVariable.BASE_API_URL;
    }
    ChannelService.prototype.getChannelNameWithType = function (type) {
        var _this = this;
        var params = this.commonService.userToken2params();
        params.append('type', type);
        return this.http.get(this.api_base + 'channel', { search: params })
            .map(function (response) {
            var res = response.json();
            if (res.ret == 0) {
                return res.channels;
            }
            else if (res.ret == 10) {
                _this.errorHandler(res.ret);
                throw new Error(res.ret);
            }
        });
    };
    ChannelService.prototype.getSubscribeChannels = function () {
        return this.getChannelNameWithType(2);
    };
    ChannelService.prototype.getUnsubscribeChannels = function () {
        return this.getChannelNameWithType(0);
    };
    ChannelService.prototype.getMyOwnChannels = function () {
        return this.getChannelNameWithType(1);
    };
    ChannelService.prototype.createChannel = function (name) {
        var params = this.commonService.userToken2params();
        var headers = this.commonService.constructFormHeader();
        var body = this.commonService.getBody({ 'name': name });
        return this.http.post(this.api_base + 'channel', body, {
            search: params,
            headers: headers
        }).map(function (response) {
            var res = response.json();
            if (res.ret == 0) {
                //OK
                return res;
            }
            else if (res.ret == 1) {
                // channel name has been used
                throw new Error(res.ret);
            }
        });
    };
    ChannelService.prototype.userSubscribeAction = function (channelId, type) {
        var _this = this;
        var params = this.commonService.userToken2params();
        var headers = this.commonService.constructFormHeader();
        var body = this.commonService.getBody({ 'action': type });
        return this.http.post(this.api_base + 'channel/' + channelId, body, {
            search: params,
            headers: headers
        }).map(function (response) {
            var res = response.json();
            if (res.ret == 0) {
                //OK
                return res;
            }
            else if (res.ret == 20) {
                //fail
                _this.errorHandler(res.ret);
                throw new Error(res.ret);
            }
        });
    };
    ChannelService.prototype.subscribe = function (channelId) {
        return this.userSubscribeAction(channelId, 0);
    };
    ChannelService.prototype.unsubscribe = function (channelId) {
        return this.userSubscribeAction(channelId, 1);
    };
    ChannelService.prototype.errorHandler = function (errCode) {
        if (errCode == 10) {
            // invalid token
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        }
        else if (errCode == 20) {
        }
    };
    ChannelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, common_service_1.CommonService, authentication_service_1.AuthenticationService])
    ], ChannelService);
    return ChannelService;
}());
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map
