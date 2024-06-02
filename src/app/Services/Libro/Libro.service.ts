import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroModelList } from 'src/app/Models/Libro/LibroCreateModel';
import { LibroPagModel, LibroPagModelResult } from 'src/app/Models/Libro/libroPaginacionModel';


import { CreateLibroModel } from 'src/app/Models/Libro/LibroCreateModel';
import { LibroModelFilter } from 'src/app/Models/Libro/libroPaginacionModel';

@Injectable({
    providedIn: 'root',
})
export class LibroService {
    private apiUrl = 'http://localhost:8000/api/v0/';

    constructor(private http: HttpClient) {}

    // LIBRO
    CreateLibro(libro: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}create/libro/`, libro);
    }

    getLibro(
        datoBuscado: string,
        pagina: number,
        page_size: number): Observable<any> {
        const httpOptions = {
            params : new HttpParams()
            .set('search', datoBuscado)
            .set('page', pagina)
            .set('page_size', page_size),
        };

        return this.http.get(`${this.apiUrl}libro/`, httpOptions);
    }

    getProveedores(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}proveedor/`);
    }

    getEditoriales(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}editoriales/`);
    }

    getLibroId(id: number): Observable<CreateLibroModel> {
        const url = `${this.apiUrl + 'libro/'}${id}/`;
        return this.http.get<CreateLibroModel>(url);
    }
    

    publicarLibro(publicacion: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}publica/`, publicacion);
    }

    deleteLibro(idLibro: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.delete<any>(
            `${this.apiUrl}create/libro/${idLibro}/`,
            httpOptions
        );
    }
    
    updateLibro(idLibro: number, libroData: any): Observable<any> {
        const url = `${this.apiUrl}create/libro/${idLibro}/`;
        return this.http.put<any>(url, libroData);
    }

    getLibros(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}create/libro/`);
    }
}
