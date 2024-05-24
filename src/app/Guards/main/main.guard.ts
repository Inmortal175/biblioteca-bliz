import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root',
})
export class MainGuard implements CanActivate {
    constructor(
        private cockieService: CookieService,
        private route: Router
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const cockie = this.cockieService.check('token-auth');
        if (!cockie) {
            this.route.navigate(['/', 'login']);
        } else {
            return true;
        }
        return false;
    }
}
