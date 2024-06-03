import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    private apiUrl = 'http://localhost:8000/api/v0/';

    constructor(private http: HttpClient) {}

    getAutores(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}autor/`);
    }
}
