import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibroModel } from 'src/app/Models/libro/libro.model';
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
    getTOP5Libros(): Observable<LibroModel> {
        return this.http.get<LibroModel>(this.baseUrl)
    }
}
