import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/Models/auth/login.model';
import { JwtAuthService } from 'src/app/Services/Auth/jwt-auth.service';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
    providers: [CookieService],
})
export class LoginPageComponent {
    LoginForm: FormGroup;
    constructor(
        private cookieService: CookieService,
        private LoginService: JwtAuthService,
        private fb: FormBuilder,
        private route: Router
    ) {
        this.LoginForm = this.fb.group({
            usuario: ['', Validators.required],
            password: ['', [Validators.required]],
        });
    }

    credencial: Login;

    Login() {
        if (this.LoginForm.valid) {
            this.credencial = {
                usuario: this.LoginForm.value.usuario,
                password: this.LoginForm.value.password,
            };
            this.LoginService.login(this.credencial).subscribe((data: any) => {
                this.cookieService.set('token-auth', data.access);
                this.route.navigate(['/', 'biblioteca']);
            });
        }
    }
}
