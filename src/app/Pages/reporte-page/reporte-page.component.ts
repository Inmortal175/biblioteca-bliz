import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
// import { Router } from '@angular/router';

//impotar los servcios
import { ReportePrestamoService } from 'src/app/Services/Reportes/reporte-prestamo.service';
import { UserService } from 'src/app/Services/Bibliotecario/user.service';
import { LibrosService } from 'src/app/Services/Libros/libros.service';
import { UsuarioService } from 'src/app/Services/usuarioBiblioteca/usuario.service';
// importar modelos
import {
    PrestamosFilter,
    ReportePrestamoModel,
    ReportePrestamosModel,
} from 'src/app/Models/Reportes/Prestamo/reportePrestamo.model';
import Swal from 'sweetalert2';

//impotacion de funciones
import { createPagination } from 'src/app/Models/Paginacion/pagination.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibroParams } from 'src/app/Models/Libros/params.model';
import { BibliotecarioParams } from 'src/app/Models/bibliotecario/bibliotecario.model';
import {
    ReporteModelUsuarioResult,
    ReporteUsuarioModel,
    ReporteUsuarioParams,
} from 'src/app/Models/Reportes/Usuario/usuario_reporte.model';
import { ReporteUsuarioService } from 'src/app/Services/Reportes/usuarioReporte/reporte-usuario.service';
import { UsuarioParam } from 'src/app/Models/UsuarioBiblioteca/params.model';

@Component({
    selector: 'app-reporte-page',
    templateUrl: './reporte-page.component.html',
    styleUrls: ['./reporte-page.component.css'],
})
export class ReportePageComponent implements OnInit {
    constructor(
        private reportePrestamoService: ReportePrestamoService,
        private libroService: LibrosService,
        private reporteUsuarioService: ReporteUsuarioService,
        private blbliotecarioServ: UserService,
        private usuarioService: UsuarioService,
        private render: Renderer2,
        private fb: FormBuilder,
    ) {
        this.reportePrestamoPageSizeForm = this.fb.group({
            pageSize: ['5', Validators.required],
        });

        this.reporteUsuarioPageSizeForm = this.fb.group({
            pageSize: ['5', Validators.required],
        });

        this.reporteDevoluciónPageSizeForm = this.fb.group({
            pageSize: ['5', Validators.required],
        });

        this.ReportePrestamoForm = this.fb.group({
            libro: [''],
            bibliotecario: [''],
            usuario: [''],
            fecha_inicio: [''],
            fecha_limite: [''],
        });

        this.ReporteUsuarioForm = this.fb.group({
            bibliotecario: [''],
            fecha_inicio: [''],
            fecha_limite: [''],
        });

        this.ReporteDevolucionForm = this.fb.group({
            bibliotecario: [''],
            usuario: [''],
            fecha_inicio: [''],
            fecha_limite: [''],
        });
    }
    //viewchid
    @ViewChild('staticBackdrop', { static: true }) modalElement!: ElementRef;

    openModal() {
        const modal = new (window as any).bootstrap.Modal(
            this.modalElement.nativeElement
        );
        modal.show();
    }

    //atributos del componente
    ListaPrestamos: ReportePrestamoModel[];
    //lista Usuarios
    ListaUsuarios: ReporteModelUsuarioResult[];

    PrestamoParams: PrestamosFilter = {
        usuario: '',
        bibliotecario: '',
        titulo: '',
        fecha_inicio: '',
        fecha_limite: '',
        page: 1,
        page_size: 5,
    };

    UsuariosParams: ReporteUsuarioParams = {
        bibliotecario: '',
        fecha_inicio: '',
        fecha_limite: '',
        page: 1,
        page_size: 5,
    };
    //variables de filtro de resporte prestamos
    //Reporte prestamos form
    ReportePrestamoForm: FormGroup;
    ReporteUsuarioForm: FormGroup;
    ReporteDevolucionForm: FormGroup;

    Libros: any[] = [];
    Usuarios: any[] = [];
    Bibliotecarios: any[] = [];

    UsuarioParam: UsuarioParam = {
        search: '',
        page: 1,
        page_size: 5,
    };

    LibroParams: LibroParams = {
        titulo: '',
        search: '',
        autor: '',
        genero: '',
        page: 1,
        page_size: 5,
    };

    BibliotecarioParams: BibliotecarioParams = {
        page: 1,
        page_size: 5,
    };

    // formGrupo para paginacion
    reportePrestamoPageSizeForm: FormGroup;
    // formGrupo para paginacion de reporte de usuarios
    reporteUsuarioPageSizeForm: FormGroup;
    // formGrupo para paginacion de reportes Devolucion
    reporteDevoluciónPageSizeForm: FormGroup;

    // datos para la paginacion

    //PAG REPORTE PRESTAMOS------------------------------
    ReportePrestamoPages: any[] = [];
    ReportePrestamoCurrentPage: number = 1;
    reportePrestamoPageSize: number = 5;
    reportePrestamoTotalPages: number;
    reportePrestamoTotalItems: number;
    //-----END REPORTE PAG----------------------

    //PAG REPORTE USUARIOS-------------------------------
    ReporteUsuarioPages: any[] = [];
    ReporteUsuarioCurrentPage: number = 1;
    reporteUsuarioPageSize: number = 5;
    reporteUsuarioTotalPages: number;
    reporteUsuarioTotalItems: number;
    //-----END REPORTE PAG-----------------------

    //PAG REPORTE DEVOLUCION------------------------------
    ReporteDevolucionPages: any[] = [];
    ReporteDevolucionCurrentPage: number = 1;
    reporteDevolucionPageSize: number = 5;
    reporteDevolucionTotalPages: number;
    reporteDevolucionTotalItems: number;
    //-----END REPORTE PAG----------------------

    //metoddos de paginacion
    //PAG. PRESTAMOS --------------------------
    getReportePrestamos() {
        this.reportePrestamoService
            .obtenerReportePrestamos(this.PrestamoParams)
            .subscribe((data: ReportePrestamosModel) => {
                this.reportePrestamoTotalItems = data.count;
                this.ListaPrestamos = data.results;
                this.reportePrestamoTotalPages = Math.ceil(
                    this.reportePrestamoTotalItems /
                        this.reportePrestamoPageSize
                );
                //creamos la paginacion
                this.ReportePrestamoPages = createPagination(
                    this.reportePrestamoTotalPages,
                    this.ReportePrestamoCurrentPage
                );
            });
    }

    changePageReportePrestamo(page: number) {
        this.ReportePrestamoCurrentPage = page;
        this.PrestamoParams.page = this.ReportePrestamoCurrentPage;
        this.getReportePrestamos();
    }

    changePageSizeReportePrestamo() {
        this.ReportePrestamoCurrentPage = 1;
        this.reportePrestamoPageSize = parseInt(
            this.reportePrestamoPageSizeForm.value.pageSize
        );

        this.PrestamoParams.page_size = this.reportePrestamoPageSize;
        this.PrestamoParams.page = this.ReportePrestamoCurrentPage;
        this.getReportePrestamos();
    }

    //PAG. USUARIO --------------------------
    getReporteUsuarios() {
        this.reporteUsuarioService
            .getReporteUsuarios(this.UsuariosParams)
            .subscribe((data: ReporteUsuarioModel) => {
                this.ListaUsuarios = data.results;

                this.reporteUsuarioTotalItems = data.count;
                this.reporteUsuarioTotalPages = Math.ceil(
                    this.reporteUsuarioTotalItems / this.reporteUsuarioPageSize
                );

                //crear paginacion de resporte usuario
                this.ReporteUsuarioPages = createPagination(
                    this.reporteUsuarioTotalPages,
                    this.ReporteUsuarioCurrentPage
                );
            });
    }

    changePageReporteUsuario(page: number) {
        this.ReporteUsuarioCurrentPage = page;
        this.UsuariosParams.page = this.ReporteUsuarioCurrentPage;
        this.getReporteUsuarios();
    }

    changePageSizeReporteUsuario() {
        this.ReporteUsuarioCurrentPage = 1;
        this.reporteUsuarioPageSize = parseInt(
            this.reporteUsuarioPageSizeForm.value.pageSize
        );

        this.UsuariosParams.page_size = this.reporteUsuarioPageSize;
        this.UsuariosParams.page = this.ReporteUsuarioCurrentPage;
        this.getReporteUsuarios();
    }

    //PAG. DEVOLICION --------------------------
    getReporteDevoluciones() {
        this.reportePrestamoService
            .obtenerReportePrestamos(this.PrestamoParams)
            .subscribe((data: ReportePrestamosModel) => {
                this.reportePrestamoTotalItems = data.count;
                this.ListaPrestamos = data.results;
                this.reportePrestamoTotalPages = Math.ceil(
                    this.reportePrestamoTotalItems /
                        this.reportePrestamoPageSize
                );
                //creamos la paginacion
                this.ReportePrestamoPages = createPagination(
                    this.reportePrestamoTotalPages,
                    this.ReportePrestamoCurrentPage
                );
            });
    }

    changePageReporteDevolucion(page: number) {
        this.ReportePrestamoCurrentPage = page;
        this.PrestamoParams.page = this.ReportePrestamoCurrentPage;
        this.getReportePrestamos();
    }

    changePageSizeReporteDevolucion() {
        this.ReportePrestamoCurrentPage = 1;
        this.reportePrestamoPageSize = parseInt(
            this.reportePrestamoPageSizeForm.value.pageSize
        );

        this.PrestamoParams.page_size = this.reportePrestamoPageSize;
        this.PrestamoParams.page = this.ReportePrestamoCurrentPage;
        this.getReportePrestamos();
    }

    //METODOS PARA FILTRAR POR LIBRO, BIBLIOTECARIO, USUARIO, Y FECHA
    FiltroReportePrestamos() {
        this.ReportePrestamoCurrentPage = 1;
        this.PrestamoParams = {
            usuario: this.ReportePrestamoForm.value.usuario,
            titulo: this.ReportePrestamoForm.value.libro,
            bibliotecario: this.ReportePrestamoForm.value.bibliotecario,
            fecha_inicio: this.ReportePrestamoForm.value.fecha_inicio,
            fecha_limite: this.ReportePrestamoForm.value.fecha_limite,
            page: this.ReportePrestamoCurrentPage,
            page_size: this.reportePrestamoPageSize,
        };
        this.getReportePrestamos();
    }
    //END METODOS PARA FILTRAR POR LIBRO, BIBLIOTECARIO, USUARIO, Y FECHA

    //ciclos de vida
    ngOnInit(): void {
        this.getReportePrestamos();
        this.getReporteUsuarios();

        //obtener datos de libro, bibliotecario y usuario
        this.libroService.obtenerLibros(this.LibroParams).subscribe(data => {
            this.LibroParams.page_size = data.count;
            this.libroService
                .obtenerLibros(this.LibroParams)
                .subscribe(data => {
                    this.Libros = data.results;
                });
        });

        this.usuarioService
            .ObtenerUsuarios(this.UsuarioParam)
            .subscribe((data: any) => {
                this.UsuarioParam.page_size = data.count;
                this.usuarioService
                    .ObtenerUsuarios(this.UsuarioParam)
                    .subscribe((data: any) => {
                        this.Usuarios = data.results;
                    });
            });

        this.blbliotecarioServ
            .getBibliotarios(this.BibliotecarioParams)
            .subscribe(data => {
                this.BibliotecarioParams.page_size = data.count;
                this.blbliotecarioServ
                    .getBibliotarios(this.BibliotecarioParams)
                    .subscribe(data => {
                        this.Bibliotecarios = data.results;
                    });
            });
    }

    generarReporte(type: string) {
        const RENDER = this.render;
        const MODAL: HTMLDivElement = this.modalElement
            .nativeElement as HTMLDivElement;
        const modalBody: HTMLDivElement = MODAL.querySelector(
            '.modal-body'
        ) as HTMLDivElement;

        // Eliminamos el iframe antiguo si existe
        const oldIframe = modalBody.querySelector('iframe');
        if (oldIframe) {
            RENDER.removeChild(modalBody, oldIframe);
        }

        // Creamos un nuevo iframe y configuramos sus estilos
        const IFRAME: HTMLIFrameElement = RENDER.createElement(
            'iframe'
        ) as HTMLIFrameElement;
        IFRAME.style.width = '100%';
        IFRAME.style.height = '700px';
        IFRAME.style.border = 'none';

        // Añadimos el nuevo iframe al modal
        RENDER.appendChild(modalBody, IFRAME);

        // Asignamos el PDF según el tipo y abrimos el modal
        switch (type) {
            case 'prestamo':
                console.log('prestamo');
                this.openModal();
                // Aquí deberías asignar la URL del PDF al iframe
                this.reportePrestamoService
                    .PdfReportePrestamos(this.PrestamoParams)
                    .subscribe((url: string) => {
                        IFRAME.src = url;
                    });
                break;
            // Puedes agregar más casos para diferentes tipos de reportes
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Tipo de reporte no soportado: ${type}`,
                    confirmButtonText: 'Aceptar',
                });
                break;
        }
    }
}
