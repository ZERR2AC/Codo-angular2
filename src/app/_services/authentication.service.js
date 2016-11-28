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
var http_1 = require('@angular/http');
var global_1 = require('../global');
require('rxjs/add/operator/map');
var common_service_1 = require("./common.service.ts");
var AuthenticationService = (function () {
    function AuthenticationService(http, commonService) {
        this.http = http;
        this.commonService = commonService;
        this.api_base = "";
        this.headers = new http_1.Headers();
        this.api_base = global_1.GlobalVariable.BASE_API_URL;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    AuthenticationService.prototype.login = function (username, password) {
        var body = this.commonService.getBody({ 'username': username, 'password': password });
        return this.http.post(this.api_base + 'user/login', body, { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    };
    AuthenticationService.prototype.signup = function (username, password) {
        var body = this.commonService.getBody({ 'username': username, 'password': password });
        return this.http.post(this.api_base + 'user/register', body, { headers: this.headers })
            .map(function (response) {
            var res = response.json();
            return res;
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.checkConnection = function () {
        return this.http.get(this.api_base + 'status', {})
            .map(function (response) { return response.json().ret; });
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, common_service_1.CommonService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
