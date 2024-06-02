import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibroModel, LibroResult } from 'src/app/Models/libro/libro.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibroService {
    private baseUrl = 'http://localhost:8000/api/v0/libro/';
    constructor(private http: HttpClient) {}

    getCantidadLibro(): Observable<LibroModel> {
        return this.http.get<LibroModel>(this.baseUrl);
    }

    getTOP5Libros(page_size: number): Observable<LibroModel> {
        const httpOptions = {
            params: new HttpParams().set('page_size', page_size)
        }
        return this.http.get<LibroModel>(this.baseUrl, httpOptions);
    }
}
