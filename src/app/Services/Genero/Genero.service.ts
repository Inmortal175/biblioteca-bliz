import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneroModel } from 'src/app/Models/Genero/GeneroModel';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = 'http://localhost:8000/api/v0/';

    constructor(private http: HttpClient) {}

    getGeneros(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}genero/`);
    }
}
