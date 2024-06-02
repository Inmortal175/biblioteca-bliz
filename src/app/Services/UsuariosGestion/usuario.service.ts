import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private url_base = 'http://localhost:8000/api/v0/';
    private url_create_usuario = 'http://localhost:8000/api/v0/create/usuario/';

    constructor(private http: HttpClient) {}

    ObtenerUsuarios(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.get(`${this.url_base}usuario`, httpOptions);
    }

    crearUsuario(usuarioData: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.post<any>(
            this.url_create_usuario,
            usuarioData,
            httpOptions
        );
    }

    modificarUsuario(idUsuario: number, usuarioData: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.put<any>(
            `${this.url_base}usuario/${idUsuario}/`,
            usuarioData,
            httpOptions
        );
    }

    eliminarUsuario(idUsuario: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };

        return this.http.delete<any>(
            `${this.url_base}usuario/${idUsuario}/`,
            httpOptions
        );
    }
}
