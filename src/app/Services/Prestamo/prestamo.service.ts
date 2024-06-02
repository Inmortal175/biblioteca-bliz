// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { PrestamoModel, PrestamoResult } from 'src/app/Models/Prestamo/prestamo.model';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root',
// })
// export class PrestamoService {
//     private urlbase: 'http://localhost:8000/api/v0/';

//     constructor(private http: HttpClient) {}
//     getCantDevVencido(): number {
//         let cant_prestamos_vencidos : number = 0
//         this.http.get<PrestamoModel>(`${this.urlbase}prestamo/`).subscribe((data : PrestamoModel) =>{
//         const count = data.count
//         const HttpOptions = {
//             params: new HttpParams().set('page_size', count)
//           }
//           this.http.get<PrestamoModel>(`${this.urlbase}prestamo/`, HttpOptions).subscribe((data: PrestamoModel) =>{
//             const resultados: any[] = data.results
//             console.log(resultados)
//             resultados.forEach((prestamo: PrestamoResult) =>{
//                 let fecha_actual = new Date()
//                 let fecha_venc = new Date(prestamo.fecha_caducidad)
//                 if (fecha_actual > fecha_venc){
//                     cant_prestamos_vencidos ++
//                 }
//             })
//           })

//       })

//         return cant_prestamos_vencidos
//     }
// }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    PrestamoModel,
    PrestamoResult,
} from 'src/app/Models/Prestamo/prestamo.model';
import { Observable, Observer, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PrestamoService {
    private urlbase: string = 'http://localhost:8000/api/v0/';

    constructor(private http: HttpClient) {}

    getCantidadPrestamos(): Observable<PrestamoModel> {
        return this.http.get<PrestamoModel>(`${this.urlbase}prestamo/`);
    }

    getCantDevVencido(): Observable<number> {
        return this.http.get<PrestamoModel>(`${this.urlbase}prestamo/`).pipe(
            switchMap((data: PrestamoModel) => {
                const count = data.count;
                const HttpOptions = {
                    params: new HttpParams().set('page_size', count.toString()),
                };
                return this.http.get<PrestamoModel>(
                    `${this.urlbase}prestamo/`,
                    HttpOptions
                );
            }),
            map((data: PrestamoModel) => {
                const resultados: PrestamoResult[] = data.results;
                let cant_prestamos_vencidos = 0;
                const fecha_actual = new Date();
                resultados.forEach((prestamo: PrestamoResult) => {
                    const fecha_venc = new Date(prestamo.fecha_caducidad);
                    if (
                        fecha_actual > fecha_venc &&
                        !prestamo.estado_devolucion
                    ) {
                        cant_prestamos_vencidos++;
                    }
                });
                return cant_prestamos_vencidos;
            })
        );
    }
}
