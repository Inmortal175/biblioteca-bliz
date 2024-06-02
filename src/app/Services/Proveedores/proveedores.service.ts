import {
    Proveedor,
    ProveedorModel,
} from '../../Models/proveedores/proveedores';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProveedorService {
    private apiUrl = 'http://localhost:8000/api/v0/proveedor/';

    constructor(private http: HttpClient) {}

    getProveedor(): Observable<ProveedorModel> {
        return this.http.get<ProveedorModel>(this.apiUrl);
    }

    getProveedorById(id: number): Observable<Proveedor> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.get<Proveedor>(url);
    }

    addProveedor(proveedor: Proveedor): Observable<Proveedor> {
        return this.http.post<Proveedor>(this.apiUrl, proveedor);
    }

    deleteProveedor(id: number): Observable<any> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.delete(url);
    }

    actualizarProveedor(proveedor: Proveedor): Observable<Proveedor> {
        const url = `${this.apiUrl}${proveedor.id_proveedor}/`;
        return this.http.put<Proveedor>(url, proveedor);
    }
}
