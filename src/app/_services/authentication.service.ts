import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GlobalVariable} from '../global'
import 'rxjs/add/operator/map'
import {CommonService} from "./common.service";

@Injectable()
export class AuthenticationService {
    private api_base = "";
    private headers = new Headers();

    constructor(private http: Http,
                private commonService: CommonService) {
        this.api_base = GlobalVariable.BASE_API_URL;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    login(username: string, password: string) {
        let body = this.commonService.getBody({'username':username,'password':password});
        return this.http.post(this.api_base + 'user/login',
            body,
            {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.ret == 0 && user.user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    signup(username: string, password: string) {
        let body = this.commonService.getBody({'username':username,'password':password});

        return this.http.post(this.api_base + 'user/register',
            body,
            {headers: this.headers})
            .map((response: Response)=> {
                let res = response.json();
                return res;
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    checkConnection(){
        return this.http.get(this.api_base + 'status', {})
            .map((response: Response)=> response.json().ret);
    }
}
