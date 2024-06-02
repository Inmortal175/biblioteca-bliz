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

    obtenerProveedor(params: PrestamosFilter): Observable<ReportePrestamosModel> {
      const HttpOptions = {
          params: new HttpParams()
              .set('usuario', params.usuario)
              .set('bibliotecario', params.bibliotecario)
              .set('title', params.titulo)
              .set('fecha_inicio', params.fecha_inicio)
              .set('fecha_limite', params.fecha_limite)
              .set('page', params.page)
              .set('page_size', params.page_size),
      };
      return this.EndPoints.get<ReportePrestamosModel>(
          `${base_url}reporte_prestamos/`,
          HttpOptions
      );
  }

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
