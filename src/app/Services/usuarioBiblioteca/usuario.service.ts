import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UsuarioParam } from 'src/app/Models/UsuarioBiblioteca/params.model';
import { Observable } from 'rxjs';
import { CreateLibroModel } from 'src/app/Models/Libros/libro_create.model';
@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {}

    private base_url = 'http://localhost:8000/api/v0/';

    ObtenerUsuarios(param: UsuarioParam) {
        const httpOptions = {
            params: new HttpParams()
                .set('search', param.search)
                .set('page', param.page)
                .set('page_size', param.page_size),
        };

        return this.http.get(`${this.base_url}usuario/`, httpOptions);
    }

    CreateLibro(libro: CreateLibroModel): Observable<CreateLibroModel> {
        return this.http.post<CreateLibroModel>(
            `${this.base_url}create/libro/`,
            libro
        );
    }
}