import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    public checkLogin(url: string) {
        if (!this.authService.loggedIn()) { return true; }

        this.authService.redirectUrl = url;
        this.router.navigate(['/home']);
        return false;
    }
}
