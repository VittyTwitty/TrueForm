import { Routes, RouterModule } from '@angular/router';
import { TrueRegistrationComponent } from './true-registration.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginGuard } from '../guards/login-guard.service';

export const routesTrueRegistration: Routes = [
    {
        path: 'registration',
        component: TrueRegistrationComponent,
        canActivate: [LoginGuard]
    }
];
