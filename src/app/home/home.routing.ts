import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth-guard.service';

export const routesHome: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard]
    }
];
