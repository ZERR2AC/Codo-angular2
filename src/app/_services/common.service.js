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
var CommonService = (function () {
    function CommonService(router, http) {
        this.router = router;
        this.http = http;
        this.api_base = "";
        this.api_base = global_1.GlobalVariable.BASE_API_URL;
    }
    CommonService.prototype.constructFormHeader = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    CommonService.prototype.userToken2params = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var params = new http_1.URLSearchParams();
        if (currentUser && currentUser.token) {
            params.set('token', currentUser.token);
        }
        return params;
    };
    CommonService.prototype.getBody = function (dict) {
        var urlSearchParams = new http_1.URLSearchParams();
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                urlSearchParams.append(key, dict[key]);
            }
        }
        var body = urlSearchParams.toString();
        return body;
    };
    CommonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map