import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class ReportePrestamoService {
    constructor(private EndPoints: HttpClient) {}

    url_base = 'http://127.0.0.1:8000/api/v0/';
    GetReportePrestamos() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: new HttpParams().set('usuario', ''), //.set('usuario', 'Franklin'),
        };

        // Crear parámetros de consulta

        return this.EndPoints.get(
            `${this.url_base}reporte_prestamo/`,
            httpOptions
        );
    }
}
