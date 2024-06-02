import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from 'src/app/Models/Usuario/usuario.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private url_base = 'http://localhost:8000/api/v0/';
    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<UsuarioModel> {
        return this.http.get<UsuarioModel>(`${this.url_base}usuario/`);
    }
}
