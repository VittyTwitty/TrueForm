import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Http } from '@angular/http';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { ValidationPatternsService } from '../shared/services/validation-patterns.service';

@Component({
    selector: 'true-registration',
    templateUrl: 'true-registration.component.html',
    styleUrls: ['true-registration.component.scss']
})

export class TrueRegistrationComponent {
    public servErrors = [];

    public titleAlert: string = 'Alert';

    public registrationForm: FormGroup = new FormGroup({
        // tslint:disable-next-line:max-line-length
        username: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(this.validationPattern.username)
        ])),
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
        ])),
        confirmPassword: new FormControl(null, Validators.compose([
            Validators.required,
            this.validatePasswordConfirmation.bind(this)
        ])),
    });

    constructor(
        private http: Http,
        private authService: AuthService,
        private router: Router,
        private validationPattern: ValidationPatternsService
    ) { }

    public registration($event, value) {
        $event.preventDefault();
        this.authService.registration(new User(value))
            .subscribe(
            (data) => {
                console.error(data);
                this.router.navigate(['/login']);
            },
            (error) => {
                this.servErrors = error.json();
                console.error(this.servErrors);
            });

    }

    public validatePasswordConfirmation(control: FormControl): any {
        if (this.registrationForm) {
            return control.value === this.registrationForm.get('password').value ? null : { notSame: true };
        }
    }
}
