import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor, AutorModel } from 'src/app/Models/autor/autor.interfaz';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    private apiUrl = 'http://localhost:8000/api/v0/autor/';
    constructor(private http: HttpClient) {}
    getAutor(): Observable<AutorModel> {
        // const HttpOptions = {
        //     params: new HttpParams().set('search', buscar),
        // };
        return this.http.get<AutorModel>(this.apiUrl);
    }
}
