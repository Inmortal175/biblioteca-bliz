import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EditorialModel } from 'src/app/Models/Editorial/editorial.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class EditorialService {
    private url_base = 'http://localhost:8000/api/v0/';
    constructor(private http: HttpClient) {}

    getCantidadEditorial(): Observable<EditorialModel> {
        return this.http.get<EditorialModel>(`${this.url_base}editoriales/`);
    }
}
