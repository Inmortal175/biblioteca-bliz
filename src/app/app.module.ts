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

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './Pages/prestamo-page/vistas/usuario/usuario.component';
import { LibroComponent } from './Pages/prestamo-page/vistas/libro/libro.component';

import { RouterModule } from '@angular/router';

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
        UsuarioComponent,
        LibroComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, SweetAlertModule, FormsModule, ReactiveFormsModule, RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
