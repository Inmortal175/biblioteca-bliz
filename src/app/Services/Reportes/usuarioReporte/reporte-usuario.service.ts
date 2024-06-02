import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

//importacion de modelos
import {
    ReporteUsuarioModel,
    ReporteUsuarioParams,
} from 'src/app/Models/Reportes/Usuario/usuario_reporte.model';
import { Observable } from 'rxjs';
import { base_url } from 'src/app/Models/Url/urls.model';

@Injectable({
    providedIn: 'root',
})
export class ReporteUsuarioService {
    constructor(private http: HttpClient) {}

    getReporteUsuarios(
        reporteUsuarioQueryParam: ReporteUsuarioParams
    ): Observable<ReporteUsuarioModel> {
        const httpOptions = {
            params: new HttpParams()
                .set('bibliotecario', reporteUsuarioQueryParam.bibliotecario)
                .set('fecha_inicio', reporteUsuarioQueryParam.fecha_inicio)
                .set('fecha_fin', reporteUsuarioQueryParam.fecha_limite)
                .set('page', reporteUsuarioQueryParam.page)
                .set('page_size', reporteUsuarioQueryParam.page_size),
        };

        return this.http.get<ReporteUsuarioModel>(
            `${base_url}reporte_usuario/`,
            httpOptions
        );
    }
}
