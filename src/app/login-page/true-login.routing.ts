import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TrueLoginComponent } from './true-login.component';
import { LoginGuard } from '../guards/login-guard.service';

export const trueLoginRoutes: Routes = [
    {
        path: 'login',
        component: TrueLoginComponent,
        canActivate: [LoginGuard]
    },
];
