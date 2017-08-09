import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigService } from '../shared/services/config.service';
import { User } from '../shared/models/user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
    public API_URL = '';
    public isLoggedIn = false;
    public redirectUrl: string;

    constructor(
        private http: Http,
        private configService: ConfigService,
        private session: SessionService
    ) {
        this.API_URL = this.configService.mainSrc;
    }

    public login(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.API_URL}login/`, data, { headers })
            .map((res) => {
                this.isLoggedIn = true;
                let userPerson = res.json();
                let token = userPerson.token;
                if (userPerson && token) {
                    let currentUser = new User(userPerson);
                    this.session.sessionToken = token;
                    localStorage.setItem('auth_token', JSON.stringify(currentUser.getUser()));
                    return currentUser;
                }

            })
            .catch((error) => {
                return Observable.throw(error);
            });
    };

    public registration(data) {
        return this.http.post(`${this.API_URL}signup/`, data)
            .map((res) => {
                return res.json();
            })
            .catch((error) => {
                console.log(error);
                return Observable.throw(error);
            });
    };

    public logout() {
        return this.http.post(`${this.API_URL}logout/`, '')
            .map((res) => {
                this.isLoggedIn = false;
                this.session.sessionToken = null;
                localStorage.removeItem('auth_token');
                return res.json();
            })
            .toPromise();
    };
    public loggedIn() {
        return !!this.session.sessionToken;
    }

}
