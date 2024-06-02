import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/Models/auth/login.model';
import { JwtAuthService } from 'src/app/Services/Auth/jwt-auth.service';
import Swal from 'sweetalert2';
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
            this.LoginService.login(this.credencial).subscribe(
                (data: any) => {
                    this.cookieService.set('token-auth', data.access);
                    Swal.fire({
                        title: 'Bienvenido',
                        text: 'tu sesión ha iniciado con éxito, disfrute de su estancia',
                        icon: 'success',
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000,
                        position: 'top',
                        background:
                            'linear-gradient(to right, rgb(41, 203, 106), rgb(73, 222, 79))',
                        color: 'white',
                        iconColor: 'white',
                    });
                    this.route.navigate(['/', 'biblioteca']);
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 0) {
                        Swal.fire({
                            title: '500 Internal Server Error',
                            text: 'hay problemas en el servidor, solucione y vuelva intentarlo  de nuevo',
                            icon: 'warning',
                        });
                    }
                }
            );
        }
    }

    KeyUpEvent(event: any) {
        if (event.key === 'Enter') {
            this.Login();
        }
    }
}
