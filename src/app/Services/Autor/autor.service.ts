import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autor, AutorParams, CreateAutor } from '../../Models/autor/autor';
import { ReportePrestamosModel } from 'src/app/Models/Reportes/Prestamo/reportePrestamo.model';
import { base_url } from 'src/app/Models/Url/urls.model';
import { AutorModelList } from 'src/app/Models/autor/AutorModel';
import { AutorModel } from 'src/app/Models/autor/autor.interfaz';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    //get
    private apiUrl = 'http://127.0.0.1:8000/api/v0/autor/';
    //post put delete
    private urlCreateAutor = 'http://127.0.0.1:8000/api/v0/create/autor/';

    constructor(private http: HttpClient) {}

    obtenerAutores(params: AutorParams): Observable<AutorModel> {
        const HttpOptions = {
            params: new HttpParams()
                .set('search', params.search)
                .set('page', params.page)
                .set('page_size', params.page_size),
        };
        return this.http.get<AutorModel>(`${base_url}autor/`, HttpOptions);
    }

    getAutor(dato_buscado): Observable<Autor[]> {
        const httpOptions = {
            params: new HttpParams().set('search', dato_buscado),
        };
        return this.http
            .get<{
                count: number;
                next: any;
                previous: any;
                results: Autor[];
            }>(this.apiUrl, httpOptions)
            .pipe(map(response => response.results));
    }

    getAutorById(id: number): Observable<Autor> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Autor>(url);
    }

    addAutor(autor: CreateAutor): Observable<CreateAutor> {
        return this.http.post<CreateAutor>(this.urlCreateAutor, autor);
    }

    deleteAutor(id: number): Observable<any> {
        const url = `${this.urlCreateAutor}${id}/`;
        return this.http.delete(url);
    }

    actualizarAutor(autor: Autor): Observable<Autor> {
        const url = `${this.urlCreateAutor}${autor.id_autor}/`;
        return this.http.put<Autor>(url, autor);
    }
    private Url = 'http://localhost:8000/api/v0/';

    getAutores(): Observable<any> {
        return this.http.get<any>(`${this.Url}autor/`);
    }
}
