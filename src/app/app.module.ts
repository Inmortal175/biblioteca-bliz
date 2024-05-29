import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//  importar SweetAlertModule
import { SweetAlertModule } from './SweetAlert/sweet-alert.module';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { PrestamoPageComponent } from './Pages/prestamo-page/prestamo-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { DevolucionesPageComponent } from './Pages/devoluciones-page/devoluciones-page.component';
import { UsuariosPageComponent } from './Pages/usuarios-page/usuarios-page.component';
import { LibrosPageComponent } from './Pages/libros-page/libros-page.component';
import { ReportePageComponent } from './Pages/reporte-page/reporte-page.component';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//interceptor
import { JwtInterceptorInterceptor } from './Inteceptors/jwt-interceptor.interceptor';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';

//modulo para jwt
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        PrestamoPageComponent,
        LoginPageComponent,
        DevolucionesPageComponent,
        UsuariosPageComponent,
        LibrosPageComponent,
        ReportePageComponent,
        DashboardPageComponent,
        AdminPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SweetAlertModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
            config: {},
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
