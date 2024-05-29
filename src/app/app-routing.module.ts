import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { PrestamoPageComponent } from './Pages/prestamo-page/prestamo-page.component';
import { DevolucionesPageComponent } from './Pages/devoluciones-page/devoluciones-page.component';
import { UsuariosPageComponent } from './Pages/usuarios-page/usuarios-page.component';
import { LibrosPageComponent } from './Pages/libros-page/libros-page.component';
import { ReportePageComponent } from './Pages/reporte-page/reporte-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { MainGuard } from './Guards/main/main.guard';
import { LoginGuard } from './Guards/Login/login.guard';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';

const routes: Routes = [
    {
        path: 'biblioteca',
        component: MainPageComponent,
        canActivate: [MainGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardPageComponent,
            },
            {
                path: 'prestamos',
                component: PrestamoPageComponent,
            },
            {
                path: 'devoluciones',
                component: DevolucionesPageComponent,
            },
            {
                path: 'usuarios',
                component: UsuariosPageComponent,
            },
            {
                path: 'libros',
                component: LibrosPageComponent,
            },
            {
                path: 'reportes',
                component: ReportePageComponent,
            },
            {
                path: 'administracion',
                component: AdminPageComponent,
            },
        ],
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [LoginGuard],
    },
    {
        path: '**',
        redirectTo: '/biblioteca/dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
