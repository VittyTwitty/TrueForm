import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    public checkLogin(url: string) {
        if (this.authService.loggedIn()) {
            console.log('залогинился');
            return true;
        }
        this.authService.redirectUrl = url;
        console.log('Иди логинься');
        this.router.navigate(['/registration']);
        return false;
    }
}
