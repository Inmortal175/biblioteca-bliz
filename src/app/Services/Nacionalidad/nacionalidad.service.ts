import { Nacionalidad } from './../../Interfaces/nacionalidad';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NacionalidadService {
    private apiUrl = 'http://127.0.0.1:8000/api/v0/nacionalidad/';

    constructor(private http: HttpClient) {}

    getNacionalidad(): Observable<Nacionalidad[]> {
        return this.http.get<Nacionalidad[]>(this.apiUrl);
    }

    getNacionalidadById(id: number): Observable<Nacionalidad> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Nacionalidad>(url);
    }

    addNacionalidad(nacionalidad: Nacionalidad): Observable<Nacionalidad> {
        return this.http.post<Nacionalidad>(this.apiUrl, nacionalidad);
    }

    deleteNacionalidad(id: number): Observable<any> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.delete(url);
    }

    actualizarNacionalidad(nacionalidad: Nacionalidad): Observable<Nacionalidad> {
        const url = `${this.apiUrl}${nacionalidad.id_nacionalidad}/`;
        return this.http.put<Nacionalidad>(url, nacionalidad);
    }
}
