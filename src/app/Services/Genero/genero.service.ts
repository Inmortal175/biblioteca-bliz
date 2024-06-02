import { Genero, GeneroFilter, GeneroModel } from '../../Models/genero/genero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { base_url } from 'src/app/Models/Url/urls.model';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/genero/';

    constructor(private http: HttpClient) {}

    obtenerGenero(params: GeneroFilter): Observable<GeneroModel> {
        const HttpOptions = {
            params: new HttpParams()
                .set('page', params.page)
                .set('page_size', params.page_size),
        };
        return this.http.get<GeneroModel>(
            `${base_url}genero/`,
            HttpOptions
        );
    }

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
