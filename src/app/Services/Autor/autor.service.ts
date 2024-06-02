import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autor, CreateAutor } from '../../Models/autor/autor';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    //get
    private apiUrl = 'http://127.0.0.1:8000/api/v0/autor/';
    //post put delete
    private urlCreateAutor = 'http://127.0.0.1:8000/api/v0/create/autor/';

    constructor(private http: HttpClient) {}

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
}
