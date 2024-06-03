import { Genero, GeneroFilter, GeneroModel } from '../../Models/genero/genero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { base_url } from 'src/app/Models/Url/urls.model';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = 'http://localhost:8000/api/v0/';

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
}
