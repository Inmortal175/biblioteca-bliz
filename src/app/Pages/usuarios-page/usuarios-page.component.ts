import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/Services/UsuariosGestion/usuario.service';
import { UsuariosModel } from 'src/app/Models/UsuariosGestion/usuario.model';
import * as ts from 'typescript';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { JwtAuthService } from 'src/app/Services/Auth/jwt-auth.service';
import { createPagination } from 'src/app/Models/Paginacion/pagination.model';

@Component({
    selector: 'app-usuarios-page',
    templateUrl: './usuarios-page.component.html',
    styleUrls: ['./usuarios-page.component.css'],
})
export class UsuariosPageComponent implements OnInit {
    usuariosEnDb: Array<any>;

    usuarioNuevo = {
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        email: '',
        es_activo: true,
        id_bibliotecario: this.authService.getUserId(),
    };
    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService,
        private authService: JwtAuthService,
        private fb: FormBuilder
    ) {
        this.UsuarioPageSizeForm = this.fb.group({
            pageSize: ['5', Validators.required],
        });
    }

    verDatosUsuario(): void {
        this.usuarioService
            .ObtenerUsuarios(this.UsuarioParam.page, this.UsuarioParam.pageSize)
            .subscribe(
                (datos: UsuariosModel) => {
                    this.usuariosEnDb = datos.results;

                    this.UsuarioTotalItems = datos.count;
                    this.UsuarioTotalPages = Math.ceil(
                        this.UsuarioTotalItems / this.UsuarioPageSize
                    );
                    this.UsuarioPage = createPagination(
                        this.UsuarioTotalPages,
                        this.UsuarioCurrentPage
                    );
                },
                error => {
                    console.error('Error al obtener usuarios:', error);
                }
            );
    }

    ngOnInit() {
        this.verDatosUsuario();
        console.log(this.authService.getUserId());
        this.actualizarDatosUsuarioForm = this.fb.group({
            nombres: ['', Validators.required],
            apellido_paterno: ['', Validators.required],
            apellido_materno: ['', Validators.required],
            telefono: ['', Validators.required],
            email: ['', Validators.required],
            es_activo: ['', Validators.required],
        });
    }

    //Bloque de datos para modificar datos del usuario.
    idUsuarioSeleccionado: number | null = null;
    usuarioSeleccionado = {
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        email: '',
        es_activo: true,
    };

    //Bloque para almacenar los datos y enviarlos al model como placeholder.

    editarUsuario(usuarioId: number, usuarioSe) {
        this.idUsuarioSeleccionado = usuarioId;
        console.log('Editando usuario con id:', usuarioId);
        //El codigo de arriba solo es un comprobante.

        this.actualizarDatosUsuarioForm.patchValue({
            nombres: usuarioSe.nombres,
            apellido_paterno: usuarioSe.apellido_paterno,
            apellido_materno: usuarioSe.apellido_materno,
            telefono: usuarioSe.telefono,
            email: usuarioSe.email,
            es_activo: usuarioSe.es_activo,
        });
    }
    resetForm() {
        this.usuarioNuevo.nombres = '';
        this.usuarioNuevo.apellido_paterno = '';
        this.usuarioNuevo.apellido_materno = '';
        this.usuarioNuevo.telefono = '';
        this.usuarioNuevo.email = '';
    }

    //User bibliotecario get
    crearUsuario(): void {
        this.usuarioService.crearUsuario(this.usuarioNuevo).subscribe(
            response => {
                Swal.fire({
                    title: 'Usuario creado',
                    text: `ID del Usuario: ${response.id_usuario}`,
                    icon: 'success',
                });
                this.verDatosUsuario();
                this.resetForm();
            },
            error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al crear el usuario',
                    icon: 'error',
                });
                console.error('Error al crear el usuario:', error);
            }
        );
    }

    modificarUsuario(): void {
        this.usuarioSeleccionado = {
            nombres: this.actualizarDatosUsuarioForm.value.nombres,
            apellido_paterno:
                this.actualizarDatosUsuarioForm.value.apellido_paterno,
            apellido_materno:
                this.actualizarDatosUsuarioForm.value.apellido_materno,
            telefono: this.actualizarDatosUsuarioForm.value.telefono,
            email: this.actualizarDatosUsuarioForm.value.email,
            es_activo: this.usuarioSeleccionado.es_activo,
        };

        console.log('Datos a enviar', this.usuarioSeleccionado);
        this.usuarioService
            .modificarUsuario(
                this.idUsuarioSeleccionado,
                this.usuarioSeleccionado
            )
            .subscribe(
                response => {
                    Swal.fire({
                        title: 'Usuario modificado',
                        text: `Se modifico con éxito`,
                        icon: 'success',
                    });
                    this.verDatosUsuario(); // Refrescar la lista de usuarios
                },
                error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al modificar el usuario',
                        icon: 'error',
                    });
                    console.error('Error al modificar el usuario:', error);
                }
            );
        console.log('Datos enviados', this.usuarioSeleccionado);
    }

    eliminarUsuario(idUsuario: number): void {
        console.log('Eliminando usuario con id', idUsuario);
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
        }).then(result => {
            if (result.isConfirmed) {
                this.usuarioService.eliminarUsuario(idUsuario).subscribe(
                    response => {
                        Swal.fire(
                            'Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        );
                        this.verDatosUsuario(); // Refrescar la lista de usuarios
                    },
                    error => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al eliminar el usuario',
                            icon: 'error',
                        });
                        console.error('Error al eliminar el usuario:', error);
                    }
                );
            }
        });
    }

    //Bloque para que el toggle modifique el bolean del usuario a modificar.
    toggleUsuarioActivo(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.usuarioSeleccionado.es_activo = inputElement.checked;
    }

    //Para formularios
    actualizarDatosUsuarioForm: FormGroup;

    //Paginacion
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

    changePageUsuario(page: number) {
        this.UsuarioCurrentPage = page;
        this.UsuarioParam.page = this.UsuarioCurrentPage;
        this.verDatosUsuario();
    }

    changePageSizeUsuario() {
        this.UsuarioCurrentPage = 1;
        this.UsuarioPageSize = parseInt(
            this.UsuarioPageSizeForm.value.pageSize
        );

        this.UsuarioParam.pageSize = this.UsuarioPageSize;
        this.UsuarioParam.page = this.UsuarioCurrentPage;
        this.verDatosUsuario();
    }
}
