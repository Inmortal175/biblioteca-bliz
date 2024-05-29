import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// modelos
import { LibroParams } from 'src/app/Models/Libros/params.model';
import { Libros } from 'src/app/Models/Libros/libros.model';
@Injectable({
    providedIn: 'root',
})
export class LibrosService {
    constructor(private http: HttpClient) {}
    private base_url = 'http://localhost:8000/api/v0/';
    obtenerLibros(parametros?: LibroParams): Observable<Libros> {
        const httpOptions = {
            params: new HttpParams()
                .set('search', parametros.search)
                .set('titulo', parametros.titulo)
                .set('autor', parametros.autor)
                .set('genero', parametros.genero)
                .set('page_size', parametros.page_size)
                .set('page', parametros.page),
        };
        return this.http.get<Libros>(`${this.base_url}libro/`, httpOptions);
    }
}
