import { Injectable } from '@angular/core';
//modulos
import { HttpClient } from '@angular/common/http';

//modelos
import { BibliotecarioModel } from 'src/app/Models/bibliotecario/bibliotecario.model';

import { base_url } from 'src/app/Models/Url/urls.model';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getBibliotecario_name(userId: number): Observable<string> {
        return this.http.get(`${base_url}bibliotecario/view/${userId}/`).pipe(
            map((data: BibliotecarioModel) => {
                return data.full_name;
            })
        );
    }
}
