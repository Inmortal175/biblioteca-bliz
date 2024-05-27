import { Proveedor } from './../../Interfaces/proveedores';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class ProveedorService{
    private apiUrl = 'http://127.0.0.1:8000/api/v0/proveedor/';

    constructor(private http: HttpClient) {}

    getProveedor(): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(this.apiUrl);
    }

    /*
    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}${id}/`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}${id}/`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`);
    }
    */
}
