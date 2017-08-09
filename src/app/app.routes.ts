import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrueLoginComponent } from './login-page/true-login.component';
import { TrueRegistrationComponent } from './registration-page/true-registration.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' }
];
