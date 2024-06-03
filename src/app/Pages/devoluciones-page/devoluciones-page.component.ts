import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { PrestamoService } from 'src/app/Services/Prestamos/prestamo.service';
import {
    PrestamosModel,
    Result,
} from 'src/app/Models/Prestamos/prestamo.model';
import { DevolucionService } from 'src/app/Services/Devoluciones/devolucion.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { createPagination } from 'src/app/Models/Paginacion/pagination.model';

import * as ts from 'typescript';
@Component({
    selector: 'app-devoluciones-page',
    templateUrl: './devoluciones-page.component.html',
    styleUrls: ['./devoluciones-page.component.css'],
})
export class DevolucionesPageComponent implements OnInit {
    nombreUsuarioPrompt: string = '';
    selectedPrestamoId: number | null = null; //Array para alamecar las IDs de las deudas seleccionadas.
    //selectedPrestamoId: number | null = null;

    prestamosEnDb: Array<any>;

    UsuarioPageSizeForm: FormGroup;
    UsuarioPage: any[] = [];
    UsuarioCurrentPage: number = 1;
    UsuarioPageSize: number = 5; //hmmmmm
    UsuarioTotalPages: number;
    UsuarioTotalItems: number;

    UsuarioParam = {
        page: 1,
        pageSize: 5,
    };

    idDevolucion: number | null = null;
    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private prestamoService: PrestamoService,
        private devolucionService: DevolucionService
    ) {
        this.UsuarioPageSizeForm = this.fb.group({
            pageSize: ['5', Validators.required],
        });
    }
    ngOnInit() {
        //this.devolucionesEnDb = this.http.get()
        this.traerDatosPrestamos();
        //console.log(this.devolucionesEnDb);
    }
    //Funcion a modificar para enviar la lista con IDs de los prestamos devueltos, tambien oculta el primer div para mostrar el feedback al usuario.
    RealizarDevolucion(): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas realizar esta devolución?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, realizar devolución',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            console.log(
                'Id de devolucion seleccionado ante de crear devolucion',
                this.selectedPrestamoId
            );
            if (result.isConfirmed) {
                this.CrearDevolucion()
                    .pipe(
                        tap(() => {
                            console.log(
                                'Id de devolucion seleccionado',
                                this.selectedPrestamoId
                            );
                        }),
                        switchMap(idDevolucion => {
                            return this.actualizarPrestamo(
                                this.selectedPrestamoId,
                                idDevolucion
                            );
                        })
                    )
                    .subscribe(
                        response => {
                            console.log('Actualización exitosa:', response);
                            this.idDevolucion = response.id_devolucion;
                            console.log(
                                'ID de Devolución actualizado:',
                                this.idDevolucion
                            );
                            Swal.fire({
                                title: 'Confirmación',
                                text: 'La operación fue exitosa',
                                icon: 'success',
                            });
                            this.traerDatosPrestamos();
                        },
                        error => {
                            console.error('Error en el proceso', error);
                            Swal.fire({
                                title: 'Error',
                                text: 'Hubo un error al realizar la devolución',
                                icon: 'error',
                            });
                        }
                    );
            }
        });
    }

    //logica del los checkboxes, se ejecuta al presionar el boton "Devolver libro".
    /*actualizarListaDevolucionCheckbox() {
        this.selectedPrestamoId = this.PrestamosFiltrados.filter(
            devolucion => devolucion.selected
        ).map(devolucion => devolucion.id_prestamo);
    }*/

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //Metodos relacionados con la bd
    traerDatosPrestamos(): void {
        this.prestamoService
            .ObtenerPrestamos(
                this.nombreUsuarioPrompt,
                this.UsuarioParam.page,
                this.UsuarioParam.pageSize
            )
            .subscribe((datos: PrestamosModel) => {
                this.prestamosEnDb = datos.results;
                this.UsuarioTotalItems = datos.count;
                this.UsuarioTotalPages = Math.ceil(
                    this.UsuarioTotalItems / this.UsuarioPageSize
                );
                this.UsuarioPage = createPagination(
                    this.UsuarioTotalPages,
                    this.UsuarioCurrentPage
                );
                console.log(this.prestamosEnDb);
            });
    }
    bucarNombreEnDb(event: any): void {
        this.nombreUsuarioPrompt = event.target.value;
        this.traerDatosPrestamos();
        //console.log('Nombre almacenado:', this.nombreEnDb); // Solo para ver el resultado en la consola.
    }

    CrearDevolucion(): Observable<number> {
        const data = {
            fecha_devolucion: this.formatDate(new Date()), // Formatear la fecha actual
        };

        return this.devolucionService.postDevolucion(data).pipe(
            tap(response => {
                this.idDevolucion = response.id_devolucion; // Almacenar el ID de devolución
            }),
            switchMap(response => {
                return new Observable<number>(observer => {
                    observer.next(response.id_devolucion);
                    observer.complete();
                });
            })
        );
    }

    actualizarPrestamo(
        idPrestamo: number,
        idDevolucion: number
    ): Observable<any> {
        console.log('ID devolucion creado', idDevolucion);
        return this.prestamoService
            .actualizarDevolucion(idPrestamo, idDevolucion)
            .pipe(
                tap(response => {
                    console.log('Actualización exitosa:', response);
                    console.log(
                        'Id D actual',
                        idDevolucion,
                        'Id D response',
                        response.id_devolucion
                    );
                })
            );
    }

    //Esto calcula si ha caducado o no
    isCaducado(fechaCaducidad: string): boolean {
        const today = new Date();
        const caducidad = new Date(fechaCaducidad);
        return caducidad < today ? false : true;
    }

    changePageUsuario(page: number) {
        this.UsuarioCurrentPage = page;
        this.UsuarioParam.page = this.UsuarioCurrentPage;
        this.traerDatosPrestamos();
    }

    changePageSizeUsuario() {
        this.UsuarioCurrentPage = 1;
        this.UsuarioPageSize = parseInt(
            this.UsuarioPageSizeForm.value.pageSize
        );

        this.UsuarioParam.pageSize = this.UsuarioPageSize;
        this.UsuarioParam.page = this.UsuarioCurrentPage;
        this.traerDatosPrestamos();
    }
}
