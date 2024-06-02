import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DevolucionService {
    private apiUrl = 'http://localhost:8000/api/v0/devolucion/';

    constructor(private http: HttpClient) {}

    postDevolucion(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<any>(this.apiUrl, data, { headers: headers });
    }
}
