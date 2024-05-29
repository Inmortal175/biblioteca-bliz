import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from 'src/app/Models/autor/autor.interfaz';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    private apiUrl = 'http://localhost:8000/api/v0/autor/';
    constructor(private http: HttpClient) {}
    getAutor(): Observable<Autor[]> {
        return this.http.get<Autor[]>(this.apiUrl);
    }
}
