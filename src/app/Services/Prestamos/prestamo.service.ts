import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrestamosModel } from '../../Models/Prestamos/prestamo.model';
import { base_url } from 'src/app/Models/Url/urls.model';
import {
    // modelos
    CreatePrestamoModel,
    CreateDetallePrestamoModel,
} from 'src/app/Models/Prestamos/CreatePrestamo.model';
import * as ts from 'typescript';

@Injectable({
    providedIn: 'root',
})
export class PrestamoService {
    private url_base = 'http://localhost:8000/api/v0/';
    private url_base_patch = 'http://localhost:8000/api/v0/create/prestamo/';

    constructor(private http: HttpClient) {}

    ObtenerPrestamos(
        datoBuscado: string,
        pagina: number,
        page_size: number
    ): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: new HttpParams()
                .set('search', datoBuscado)
                .set('page', pagina)
                .set('page_size', page_size),
        };

        return this.http.get(`${this.url_base}prestamo`, httpOptions);
    }
    actualizarDevolucion(
        idPrestamo: number,
        idDevolucion: number
    ): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.url_base_patch}${idPrestamo}/`;
        const body = { id_devolucion: idDevolucion };

        return this.http.patch<any>(url, body, { headers: headers });
    }
    CreatePrestamo(data: CreatePrestamoModel): Observable<CreatePrestamoModel> {
        return this.http.post<CreatePrestamoModel>(
            `${base_url}create/prestamo/`,
            data
        );
    }
    CreateDetallePrestamo(
        data: CreateDetallePrestamoModel
    ): Observable<CreateDetallePrestamoModel> {
        return this.http.post<CreateDetallePrestamoModel>(
            `${base_url}create/detalle_prestamo/`,
            data
        );
    }
}