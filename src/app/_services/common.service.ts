import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {GlobalVariable} from "../global";
import {Observable} from "rxjs";

@Injectable()
export class CommonService {
    private api_base = "";

    constructor(private router: Router,
                private http: Http) {
        this.api_base = GlobalVariable.BASE_API_URL;
    }

    constructFormHeader():Headers{
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }

    userToken2params():URLSearchParams{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let params: URLSearchParams = new URLSearchParams();
        if (currentUser && currentUser.token) {
            params.set('token', currentUser.token);
        }
        return params;
    }

    getBody(dict: Object){
        let urlSearchParams = this.getBodyParams(dict);
        let body = urlSearchParams.toString();
        return body;
    }

    getBodyParams(dict: Object){
        let urlSearchParams = new URLSearchParams();
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                urlSearchParams.append(key, dict[key]);
            }
        }
        return urlSearchParams;
    }

}
