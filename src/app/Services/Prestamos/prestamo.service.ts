import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// modelos
import {
    CreatePrestamoModel,
    CreateDetallePrestamoModel,
} from 'src/app/Models/Prestamos/CreatePrestamo.model';

import { base_url } from 'src/app/Models/Url/urls.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class PrestamoService {
    constructor(private http: HttpClient) {}

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
