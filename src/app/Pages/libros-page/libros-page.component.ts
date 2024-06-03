import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {
//     CreateLibroModel,
//     FormLibroModel,
//     LibroModelListResult,
//     LibroModelList,
// } from 'src/app/Models/Libro/LibroCreateModel';
// import { LibroModelListResult } from 'src/app/Models/Libro/LibroCreateModel';
import {
    EditorialModel,
    EditorialModelResult,
} from 'src/app/Models/Editorial/EditorialModel';

import { ProveedorModelListResult } from 'src/app/Models/proveedores/ProveedoresModel';

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibroService } from './../../Services/Libro/Libro.service';
import { AutorService } from './../../Services/Autor/Autor.service';
import { GeneroService } from 'src/app/Services/Genero/Genero.service';
import * as bootstrap from 'bootstrap';

import { createPagination } from 'src/app/Models/Paginacion/pagination.model';
// import { LibroModelListResult } from 'src/app/Models/Libro/LibroCreateModel';
import { LibroModel, LibroResult } from 'src/app/Models/libro/libro.model';

@Component({
    selector: 'app-libros-page',
    templateUrl: './libros-page.component.html',
    styleUrls: ['./libros-page.component.css'],
})
export class LibrosPageComponent implements OnInit {
    nuevoLibro: any = {
        titulo: '',
        anio_publicacion: '',
        cantidad: '',
        descripcion: '',
        id_autor: 0,
        id_genero: 0,
        id_proveedor: 0,
        id_bibliotecario: 1,
        id_editorial: 0,
    };

    libroActual: any = {
        titulo: '',
        anio_publicacion: '',
        cantidad: '',
        descripcion: '',
        id_autor: 0,
        id_genero: 0,
        id_proveedor: 0,
        id_bibliotecario: 1,
        id_editorial: 0,
    };

    libros: LibroResult[] = [];
    autores: any[] = [];
    generos: any[] = [];
    proveedores: ProveedorModelListResult[] = [];
    editoriales: EditorialModelResult[] = [];
    // libroActual: any = null;

    libroForm: FormGroup;

    constructor(
        private LibroService: LibroService,
        private AutorService: AutorService,
        private GeneroService: GeneroService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.LibroPageSizeForm = this.formBuilder.group({
            pageSize: ['5', Validators.required],
        });
    }

    ngOnInit(): void {
        this.llenarLibro();
        this.llenarAutor();
        this.llenarProveedor();
        this.llenarGenero();
        this.llenarEditorial();

        this.libroForm = this.formBuilder.group({
            titulo: ['', [Validators.required]],
            anio_publicacion: ['', [Validators.required]],
            cantidad: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            id_autor: ['', [Validators.required]],
            id_genero: ['', [Validators.required]],
            id_proveedor: ['', [Validators.required]],
            id_editorial: ['', [Validators.required]],
            id_bibliotecario: [1],
        });
    }

    llenarLibro() {
        this.LibroService.getLibro(
            this.inputLibros,
            this.LibroParam.page,
            this.LibroParam.pageSize
        ).subscribe(data => {
            this.libros = data.results;

            this.LibroTotalItems = data.count;
            this.LibroTotalPages = Math.ceil(
                this.LibroTotalItems / this.LibroPageSize
            );
            this.LibroPage = createPagination(
                this.LibroTotalPages,
                this.LibroCurrentPage
            );
            console.log(this.libros);
        });
    }

    llenarEditorial() {
        this.LibroService.getEditoriales().subscribe((data: EditorialModel) => {
            this.editoriales = data.results;
        });
    }

    llenarAutor() {
        this.AutorService.getAutores().subscribe(data => {
            this.autores = data.results;
            console.log(this.autores);
        });
    }

    llenarProveedor() {
        this.LibroService.getProveedores().subscribe(data => {
            this.proveedores = data.results;
            console.log(this.proveedores);
        });
    }

    llenarGenero() {
        this.GeneroService.getGeneros().subscribe(data => {
            this.generos = data.results;
            console.log(this.generos);
        });
    }

    registrarLibro() {
        if (this.libroForm.valid) {
            this.nuevoLibro = {
                titulo: this.libroForm.value.titulo,
                anio_publicacion: this.libroForm.value.anio_publicacion,
                cantidad: this.libroForm.value.cantidad,
                descripcion: this.libroForm.value.descripcion,
                id_autor: this.libroForm.value.id_autor,
                id_genero: this.libroForm.value.id_genero,
                id_proveedor: this.libroForm.value.id_proveedor,
                id_bibliotecario: this.libroForm.value.id_bibliotecario,
                id_editorial: this.libroForm.value.id_editorial,
            };
            this.nuevoLibro.id_bibliotecario = 1;
            this.LibroService.CreateLibro(this.nuevoLibro).subscribe(
                response => {
                    this.publicarLibro(response.id_libro);
                },
                error => {
                    Swal.fire({
                        title: 'ERROR',
                        text: `Error: ${error.error}`,
                        icon: 'error',
                    });
                }
            );
        }
    }

    publicarLibro(idLibro: number) {
        const publicacion = {
            id_editorial: this.nuevoLibro.id_editorial,
            id_libro: idLibro,
        };

        this.LibroService.publicarLibro(publicacion).subscribe(
            response => {
                Swal.fire({
                    title: 'Confirmación',
                    text: 'Se ha registrado el libro, con éxito',
                    icon: 'success',
                });
                this.libroForm.reset();
                this.llenarLibro();
            },
            error => {
                console.error('Error publicando el libro:', error);
            }
        );
    }

    eliminarLibro(idLibro: any) {
        Swal.fire({
            title: '¿Estás seguro de eliminar el libro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.isConfirmed) {
                this.LibroService.deleteLibro(idLibro).subscribe(
                    response => {
                        Swal.fire(
                            'Eliminado!',
                            'El libro ha sido eliminado.',
                            'success'
                        );
                        this.llenarLibro();
                    },
                    error => {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el libro.',
                            'error'
                        );
                    }
                );
            }
        });
    }

    abrirModalActualizar(libro: any) {
        this.libroActual = libro;
        console.log(libro);
        this.libroForm.patchValue({
            titulo: this.libroActual.titulo,
            anio_publicacion: this.libroActual.anio_publicacion,
            cantidad: this.libroActual.cantidad,
            descripcion: this.libroActual.descripcion,
            id_autor: this.libroActual.id_autor,
            id_genero: this.libroActual.id_genero,
            id_proveedor: libro.id_proveedor,
            id_bibliotecario: 1,
            id_editorial: this.libroActual.id_editorial,
        });
        console.log('libroActual:', this.libroActual);
    }

    actualizarLibro() {
        if (this.libroActual && this.libroActual.id) {
            const libroId = this.libroActual.id;
            const payload = {
                titulo: this.libroForm.value.titulo,
                anio_publicacion: this.libroForm.value.anio_publicacion,
                cantidad: this.libroForm.value.cantidad,
                descripcion: this.libroForm.value.descripcion,
                id_autor: this.libroForm.value.id_autor,
                id_genero: this.libroForm.value.id_genero,
                id_proveedor: this.libroForm.value.id_proveedor,
                id_bibliotecario: this.libroForm.value.id_bibliotecario,
            };
            // Verificar si algún campo necesario está indefinido
            console.log('Actualizando libro con ID:', libroId);
            console.log('Payload:', payload);
            this.LibroService.updateLibro(libroId, payload).subscribe(
                response => {
                    console.log('Libro actualizado:', response);
                    this.llenarLibro();
                },
                error => {
                    console.error('Error actualizando el libro:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo actualizar el libro. Por favor, inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            );
        } else {
            console.error('Libro actual o id_libro no definido.');
            Swal.fire({
                title: 'Error',
                text: 'ID del libro no definido. No se puede actualizar.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }

    DirigirAdmin() {
        this.router.navigate(['biblioteca/administracion']);
    }

    //BuscarNombre
    inputLibros: string = '';
    bucarNombreEnDb(event: any): void {
        this.inputLibros = event.target.value;
        this.llenarLibro();
        //console.log('Nombre almacenado:', this.nombreEnDb); // Solo para ver el resultado en la consola.
    }

    //Paginacion
    LibroParam = {
        page: 1,
        pageSize: 5,
    };

    LibroPageSizeForm: FormGroup;
    LibroPage: any[] = [];
    LibroCurrentPage: number = 1;
    LibroPageSize: number = 5;
    LibroTotalPages: number;
    LibroTotalItems: number;

    changePageLibro(page: number) {
        this.LibroCurrentPage = page;
        this.LibroParam.page = this.LibroCurrentPage;
        this.llenarLibro();
    }

    changePageSizeLibro() {
        this.LibroCurrentPage = 1;
        this.LibroPageSize = parseInt(this.LibroPageSizeForm.value.pageSize);

        this.LibroParam.pageSize = this.LibroPageSize;
        this.LibroParam.page = this.LibroCurrentPage;
        this.llenarLibro();
    }
}
