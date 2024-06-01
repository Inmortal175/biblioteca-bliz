import { Genero } from './../../Interfaces/genero';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/genero/';

    constructor(private http: HttpClient) {}

    getGenero(): Observable<Genero[]> {
        return this.http.get<Genero[]>(this.apiUrl);
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
