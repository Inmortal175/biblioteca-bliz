import { Nacionalidad } from './../../Interfaces/nacionalidad';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class NacionalidadService{
    private apiUrl = 'http://127.0.0.1:8000/api/v0/nacionalidad/';

    constructor(private http: HttpClient) {}

    getNacionalidad(): Observable<Nacionalidad[]> {
        return this.http.get<Nacionalidad[]>(this.apiUrl);
    }
}
