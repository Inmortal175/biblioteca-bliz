import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { JwtAuthService } from '../Services/Auth/jwt-auth.service';
import Swal from 'sweetalert2';
@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
    constructor(
        private cookieService: CookieService,
        private authService: JwtAuthService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        /* Este fragmento de código es parte de un interceptor HTTP en Angular que es responsable de
        agregar un token JWT a los encabezados de la solicitud antes de enviar la solicitud al
        servidor. Aquí hay un desglose de lo que hace: */
        let token: string = this.cookieService.get('token-auth');

        let req = request;

        /* El bloque `if (token) {...}` en el fragmento de código verifica si existe un token JWT en
        las cookies. Si se encuentra un token, crea un nuevo objeto HttpRequest ("req") clonando la
        solicitud original ("solicitud") y agregando el token JWT a los encabezados de la solicitud.
        Esto se hace configurando el encabezado 'Autorización' con el valor 'Portador <token>'. */
        if (token) {
            req = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        /* Esta parte del código utiliza el operador `pipe` para manejar errores en la solicitud HTTP.
        Aquí hay un desglose de lo que hace: */
        return next.handle(req).pipe(
            catchError(error => {
                /* Esta parte del código maneja el escenario en el que la solicitud HTTP devuelve un
                código de estado 401 (no autorizado). Aquí hay un desglose de lo que hace: */
                if (error.status === 401) {
                    /* El bloque `if (token) {...} else {...}` en el fragmento de código maneja el
                    escenario en el que la solicitud HTTP devuelve un código de estado de 401 (no
                    autorizado). Aquí hay un desglose de lo que hace: */
                    if (token) {
                        this.authService.LogOut(); // Realiza el logout en caso de error 401
                    } else {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            icon: 'error',
                            title: '¡Oops!',
                            text: 'Parece que no has proporcionado las credenciales correctas. Por favor, verifica tus datos e inténtalo de nuevo.',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: toast => {
                                toast.addEventListener(
                                    'mouseenter',
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    'mouseleave',
                                    Swal.resumeTimer
                                );
                            },
                        });
                    }
                    return throwError(error); // Devuelve el error para que sea manejado en otros lugares si es necesario
                }
                return throwError(error); // Asegúrate de devolver el error en caso de que no sea un error 401
            })
        );
    }
}
