import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../../Models/editorial/editorial';

@Injectable({
    providedIn: 'root',
})
export class EditorialService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/editorial/';

    constructor(private http: HttpClient) {}

    getEditorial(): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(this.apiUrl);
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
