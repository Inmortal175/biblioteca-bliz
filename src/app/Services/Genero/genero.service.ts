import { Genero, GeneroModel } from '../../Models/genero/genero';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/genero/';

    constructor(private http: HttpClient) {}

    // obtenerGenero(params: PrestamosFilter): Observable<ReportePrestamosModel> {
    //     const HttpOptions = {
    //         params: new HttpParams()
    //             .set('usuario', params.usuario)
    //             .set('bibliotecario', params.bibliotecario)
    //             .set('title', params.titulo)
    //             .set('fecha_inicio', params.fecha_inicio)
    //             .set('fecha_limite', params.fecha_limite)
    //             .set('page', params.page)
    //             .set('page_size', params.page_size),
    //     };
    //     return this.EndPoints.get<ReportePrestamosModel>(
    //         `${base_url}reporte_prestamos/`,
    //         HttpOptions
    //     );
    // }

    getGenero(): Observable<GeneroModel> {
        return this.http.get<GeneroModel>(this.apiUrl);
    }

    getGeneroById(id: number): Observable<Genero> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Genero>(url);
    }

    addGenero(genero: Genero): Observable<Genero> {
        return this.http.post<Genero>(this.apiUrl, genero);
    }

    deleteGenero(id: number): Observable<any> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.delete(url);
    }

    actualizarGenero(genero: Genero): Observable<Genero> {
        const url = `${this.apiUrl}${genero.id_genero}/`;
        return this.http.put<Genero>(url, genero);
    }
}
