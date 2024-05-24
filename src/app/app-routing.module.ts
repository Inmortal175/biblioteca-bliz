import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { PrestamoPageComponent } from './Pages/prestamo-page/prestamo-page.component';
import { DevolucionesPageComponent } from './Pages/devoluciones-page/devoluciones-page.component';
import { UsuariosPageComponent } from './Pages/usuarios-page/usuarios-page.component';
import { LibrosPageComponent } from './Pages/libros-page/libros-page.component';
import { ReportePageComponent } from './Pages/reporte-page/reporte-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { UsuarioComponent } from './Pages/prestamo-page/vistas/usuario/usuario.component';
import { LibroComponent } from './Pages/prestamo-page/vistas/libro/libro.component';

const routes: Routes = [
    {
        path: 'biblioteca',
        component: MainPageComponent,
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
                children:[
                    {
                    path: '',
                    redirectTo: 'user',
                    pathMatch: 'full',
                    },
                    {
                        path: 'user',
                        component: UsuarioComponent
                    },
                    {
                        path:'libro',
                        component : LibroComponent
                    }
                ]
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
        ],
    },
    // {
    //     path: 'login',
    //     component: LoginPageComponent,
    // },
    // {
    //     path: '**',
    //     redirectTo: '/biblioteca/dashboard',
    //     pathMatch: 'full',
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
