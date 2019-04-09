var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
var Api = /** @class */ (function () {
    function Api(HTTP) {
        this.HTTP = HTTP;
        this.url = 'https://dsdemo.disciplesoft.co.za/api';
        this.churchname = "MCA";
        this.fullChurchName = "Borrowdale Community Church";
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    Api.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        var cacheKey = this.url + '/' + endpoint;
        // let request =  this.http.get(this.url + '/' + endpoint, reqOpts);
        return this.HTTP.get(this.url + '/' + endpoint, {}, {});
        // return this.cache.loadFromObservable(cacheKey, request);
    };
    Api.prototype.post = function (endpoint, body, reqOpts, headers) {
        return this.HTTP.post(this.url + '/' + endpoint, body, headers);
    };
    Api.prototype.put = function (endpoint, body, reqOpts, headers) {
        return this.HTTP.put(this.url + '/' + endpoint, body, headers);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts, headers) {
        return this.HTTP.patch(this.url + '/' + endpoint, body, headers);
    };
    Api = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HTTP])
    ], Api);
    return Api;
}());
export { Api };
//# sourceMappingURL=api.js.map