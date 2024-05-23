import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/Models/auth/login.model';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root',
})
export class JwtAuthService {
    constructor(
        private http: HttpClient,
        private cockieServ: CookieService,
        private route: Router
    ) {}
    private base_url = 'http://127.0.0.1:8000/api/';
    login(credentials: Login) {
        return this.http.post<any>(`${this.base_url}token/`, credentials);
    }

    LogOut() {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tu sesión a finalizado',
            showConfirmButton: false,
            timer: 1500,
        });
        this.cockieServ.delete('token-auth', '/');
        this.cockieServ.delete('token-auth', '');
        this.route.navigate(['/', 'login']);
    }
}
