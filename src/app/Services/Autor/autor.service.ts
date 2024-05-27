import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../Interfaces/autor';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/autor/';

    constructor(private http: HttpClient) {}

    getAutor(): Observable<Autor[]> {
        return this.http.get<Autor[]>(this.apiUrl);
    }

    getAutorById(id: number): Observable<Autor> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Autor>(url);
    }

    addAutor(autor: Autor): Observable<Autor> {
        return this.http.post<Autor>(this.apiUrl, autor);
    }

    deleteAutor(id: number): Observable<any> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.delete(url);
    }

    actualizarAutor(autor: Autor): Observable<Autor> {
        const url = `${this.apiUrl}${autor.id_autor}/`;
        return this.http.put<Autor>(url, autor);
    }
}
