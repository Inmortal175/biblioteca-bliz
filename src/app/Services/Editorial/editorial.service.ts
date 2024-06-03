import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    EditorialModel,
    Editorial,
    EditorialParams,
} from 'src/app/Models/Editorial/editorial';
import { base_url } from 'src/app/Models/Url/urls.model';

@Injectable({
    providedIn: 'root',
})
export class EditorialService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/editorial/';

    constructor(private http: HttpClient) {}

    obtenerEditorial(params: EditorialParams): Observable<EditorialModel> {
        const HttpOptions = {
            params: new HttpParams()
                .set('page', params.page)
                .set('page_size', params.page_size),
        };
        return this.http.get<EditorialModel>(
            `${base_url}editorial/`,
            HttpOptions
        );
    }

    getEditorial(): Observable<EditorialModel> {
        return this.http.get<EditorialModel>(this.apiUrl);
    }

    getEditorialById(id: number): Observable<Editorial> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Editorial>(url);
    }

    addEditorial(editorial: Editorial): Observable<Editorial> {
        return this.http.post<Editorial>(this.apiUrl, editorial);
    }

    deleteEditorial(id: number): Observable<any> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.delete(url);
    }

    actualizarEditorial(editorial: Editorial): Observable<Editorial> {
        const url = `${this.apiUrl}${editorial.id_editorial}/`;
        return this.http.put<Editorial>(url, editorial);
    }
}
