import { Genero } from './../../Interfaces/genero';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class GeneroService{
    private apiUrl = 'http://127.0.0.1:8000/api/v0/genero/';

    constructor(private http: HttpClient) {}

    getGenero(): Observable<Genero[]> {
        return this.http.get<Genero[]>(this.apiUrl);
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
