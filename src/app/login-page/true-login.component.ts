import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Http } from '@angular/http';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { ValidationPatternsService } from '../shared/services/validation-patterns.service';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'true-login',
    templateUrl: 'true-login.component.html',
    styleUrls: ['true-login.component.scss']
})

export class TrueLoginComponent {

    public loggedUser: User;

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern(this.validationPattern.email)
        ])),
        password: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(30),
            Validators.pattern(this.validationPattern.password)
        ]))
    });

    constructor(
        private http: Http,
        private authService: AuthService,
        private router: Router,
        private validationPattern: ValidationPatternsService
        ) { }

    public login($event, value) {
        $event.preventDefault();
        this.authService.login(new User(value))
            .subscribe(
            (res) => {
                console.log(res);
                this.router.navigate(['/home']);
            },
            (error) => {
                console.log(error.json());
            });

        console.log(value);
    }
}
