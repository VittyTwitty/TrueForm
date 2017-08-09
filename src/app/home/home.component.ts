import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'true-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent {
    constructor(
        private http: Http,
        private authService: AuthService,
        private router: Router
    ) { }

    public logout() {
        this.authService.logout()
        .then((res) => {
            this.router.navigate(['/login']);
            console.log(res);
        });
    }
}
