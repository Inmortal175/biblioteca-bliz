import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
} from '@angular/core';

import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';

//importes de servicios
import { UsuarioService } from 'src/app/Services/usuarioBiblioteca/usuario.service';
import { JwtAuthService } from 'src/app/Services/Auth/jwt-auth.service';
import { LibrosService } from 'src/app/Services/Libros/libros.service';
import { PrestamoService } from 'src/app/Services/Prestamos/prestamo.service';

//importes de modelos
import {
    Usuario,
    Result,
} from 'src/app/Models/UsuarioBiblioteca/usuario.model';
import { Libros } from 'src/app/Models/Libros/libros.model';
import { LibroParams } from 'src/app/Models/Libros/params.model';
import { UsuarioParam } from 'src/app/Models/UsuarioBiblioteca/params.model';
import {
    CreateDetallePrestamoModel,
    CreatePrestamoModel,
} from 'src/app/Models/Prestamos/CreatePrestamo.model';

//sweetAlert2
import Swal from 'sweetalert2';
//PDF MAKER
// importar los modulos para el uso de pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';

import CustomPdfFonts from 'src/assets/fonts/pdfmake-fonts';
import { UserService } from 'src/app/Services/Bibliotecario/user.service';

pdfMake.vfs = { ...pdfFonts.pdfMake.vfs, ...CustomPdfFonts.pdfMake.vfs };

pdfMake.fonts = {
    Ticket: {
        normal: 'Ticketing.ttf',
        bold: 'Ticketing.ttf',
    },
    IBM: {
        normal: 'IBMPlexMono-SemiBold.ttf',
        bold: 'IBMPlexMono-SemiBold.ttf',
    },
};

// PdfMake end
@Component({
    selector: 'app-prestamo-page',
    templateUrl: './prestamo-page.component.html',
    styleUrls: ['./prestamo-page.component.css'],
})
export class PrestamoPageComponent implements OnInit, AfterViewInit {
    //En este atrbuto del componente se pondra el Id del Bibliotcario que inicio Sesion
    protected Id_bibliotecario: number;
    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private authService: JwtAuthService,
        private libroService: LibrosService,
        private prestamoService: PrestamoService,
        private route: Router,
        private render: Renderer2,
        private bibliotecarioService: UserService
    ) {
        localStorage.removeItem('prev_page');
        this.Id_bibliotecario = this.authService.getUserId();
        this.UsuariopageSizeForm = this.fb.group({
            pageSize: new FormControl('5'),
        });
        this.LibropageSizeForm = this.fb.group({
            pageSize: new FormControl('5'),
        });

        this.FechaCadForm = this.fb.group({
            fecha_caducidad: ['', Validators.required],
        });
    }

    // seleccion de un usuario
    Selected: boolean = false;
    private userId: number;

    private USUARIO;

    // datos de creacion de Prestamo
    FechaCadForm: FormGroup<any>; //crea un form group para la fecha
    Prestamos: CreatePrestamoModel = {
        fecha_prestamo: '',
        fecha_caducidad: '',
        id_usuario: 0,
        id_bibliotecario: 0,
    };

    DetallePrestamo: CreateDetallePrestamoModel = {
        id_libro: 0,
        id_prestamo: 32,
    };

    // disable checkbox
    @ViewChildren('row') Trow: QueryList<ElementRef>;

    // DATOS Y METODO PARA LA PAGINA DE USUARIOS
    // datos de paginacion de uauario
    UsuariopageSizeForm: FormGroup<any>;
    UsuarioCurrentPage = 1;
    UsuarioPageSize = 5;
    UsuarioTotalItems: number;
    UsuarioTotalPages: number;
    UsuarioPages: any[] = []; // para mostrar las paginas del usuario

    usuarios: Result[];
    //parametro de busqueda usuario
    usuarioParams: UsuarioParam = {
        search: '',
        page: this.UsuarioCurrentPage,
        page_size: this.UsuarioPageSize,
    };

    //metodo para buscar libro
    BuscarUsuario(event) {
        let busqueda = event.target.value;
        this.usuarioParams.search = busqueda;
        this.getUsuarios();
    }

    getUsuarios() {
        this.usuarioService
            .ObtenerUsuarios(this.usuarioParams)
            .subscribe((datos: Usuario) => {
                this.usuarios = datos.results;
                this.UsuarioTotalItems = datos.count;
                this.UsuarioTotalPages = Math.ceil(
                    this.UsuarioTotalItems / this.UsuarioPageSize
                );
                this.UsuarioPages = this.createPagination(
                    this.UsuarioTotalPages,
                    this.UsuarioCurrentPage,
                    this.UsuarioPages
                );
            });
    }

    changePageSizeUsuario() {
        this.UsuarioCurrentPage = 1;
        this.UsuarioPageSize = parseInt(
            this.UsuariopageSizeForm.value.pageSize
        );
        this.usuarioParams.page = this.UsuarioCurrentPage;
        this.usuarioParams.page_size = this.UsuarioPageSize;
        this.getUsuarios();
    }

    changePageUsuario(page: number) {
        this.UsuarioCurrentPage = page;
        this.usuarioParams.page = this.UsuarioCurrentPage;
        this.createPagination(
            this.UsuarioTotalPages,
            this.UsuarioCurrentPage,
            this.UsuarioPages
        );
        this.getUsuarios();
    }

    // DATOS Y METODO PARA LA PAGINA DE LIBROS
    // datos de paginacion de libro
    LibropageSizeForm: FormGroup<any>;
    LibroCurrentPage = 1;
    LibropageSize = 5;
    LibroTotalPages: number;
    LibroTotalItems: number;
    LibrosPages: any[] = []; // para mostrar las paginas de los libros

    libros: Libros;
    //parametro de busqueda libro
    params: LibroParams = {
        search: '',
        autor: '',
        genero: '',
        titulo: '',
        page_size: this.LibropageSize,
        page: this.LibroCurrentPage,
    };
    // LIBROS USE SE VAN A PRESTAR
    ListaLibros: any[] = [];

    AgregarLibro(libro: any) {
        if (!this.ListaLibros.includes(libro)) {
            this.ListaLibros.push(libro);
            Swal.fire({
                toast: true,
                timer: 1500,
                showConfirmButton: false,
                background: 'green',
                html: `se agregó el libro <strong>${libro.titulo}</strong> al préstamo.`,
                position: 'top',
                icon: 'success',
                iconColor: 'white',
                color: 'white',
            });
        } else {
            Swal.fire({
                toast: true,
                timer: 1500,
                showConfirmButton: false,
                background: '#f7576f',
                html: `El libro <strong>${libro.titulo}</strong> ya fue añadido`,
                position: 'top',
                icon: 'error',
                iconColor: 'white',
                color: 'white',
            });
        }
    }

    EliminarLibro(libro: any) {
        const index = this.ListaLibros.indexOf(libro);

        let DeleteToast = Swal.mixin({
            backdrop: true,
            timer: 1500,
            showConfirmButton: false,
        });

        Swal.fire({
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'No, conservar',
            confirmButtonText: 'Sí, eliminar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            backdrop: true,
            title: `¿Desea eliminar el libro "${libro.titulo}"?`,
            text: 'Elimine si está seguro.',
            position: 'center',
            icon: 'question',
        }).then(resultado => {
            {
                if (resultado.isConfirmed) {
                    if (index > -1) {
                        this.ListaLibros.splice(index, 1);
                        DeleteToast.fire(
                            'Libro eliminado con éxito',
                            '',
                            'success'
                        );
                    }
                } else {
                    DeleteToast.fire('El libro no fue eliminado', '', 'info');
                }
            }
        });
    }

    BuscarLibro(event) {
        let busqueda = event.target.value;
        this.LibroCurrentPage = 1;
        this.params.search = busqueda;
        this.GetLibros();
    }

    changePageSizeLibro() {
        this.LibroCurrentPage = 1;
        this.LibropageSize = parseInt(this.LibropageSizeForm.value.pageSize);
        this.params.page = this.LibroCurrentPage;
        this.params.page_size = this.LibropageSize;
        this.GetLibros();
    }

    //OBTNER Libros
    GetLibros() {
        this.libroService.obtenerLibros(this.params).subscribe(data => {
            this.libros = data as Libros;
            this.LibroTotalItems = data.count;
            this.LibroTotalPages = Math.ceil(
                this.LibroTotalItems / this.LibropageSize
            );
            this.LibrosPages = this.createPagination(
                this.LibroTotalPages,
                this.LibroCurrentPage,
                this.LibrosPages
            );
        });
    }

    RealizarPrestamo() {
        let fecha_actual: Date = new Date();
        Swal.fire({
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, continuar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            backdrop: true,
            title: `¿Estás Seguro de Realizar el Prestamo?`,
            text: '¡Esta accion es irreversible, ten cuidado!',
            position: 'center',
            icon: 'question',
        }).then(resultado => {
            {
                if (resultado.isConfirmed) {
                    if (
                        new Date(this.FechaCadForm.value.fecha_caducidad) >
                        fecha_actual
                    ) {
                        if (
                            this.ListaLibros.length > 0 &&
                            this.Id_bibliotecario &&
                            this.userId &&
                            this.FechaCadForm.valid
                        ) {
                            this.Prestamos = {
                                fecha_caducidad:
                                    this.FechaCadForm.value.fecha_caducidad,
                                fecha_prestamo: `${fecha_actual.getFullYear()}-${fecha_actual.getMonth().toString().padStart(2, '0')}-${fecha_actual.getDate().toString().padStart(2, '0')}`,
                                id_usuario: this.userId,
                                id_bibliotecario: this.Id_bibliotecario,
                            };

                            /* Se crea un nuevo préstamo (prestamo) usando el método
                            `CreatePrestamo` de `prestamoService`, luego itera sobre cada libro en la matriz
                            `ListaLibros` y crea un nuevo detalle de préstamo (DetallePestamo) para cada libro
                            llamando el método `CreateDetallePrestamo` de `prestamoService`. `id_libro` se establece
                            en la identificación del libro actual y `id_prestamo` se establece en la identificación
                            del préstamo recién creado (data.id_prestamo). */
                            // this.prestamoService
                            //     .CreatePrestamo(this.Prestamos)
                            //     .subscribe((data: CreatePrestamoModel) => {
                            //         this.ListaLibros.forEach(libro => {
                            //             this.DetallePrestamo = {
                            //                 id_libro: libro.id,
                            //                 id_prestamo: data.id_prestamo,
                            //             };

                            //             this.prestamoService.CreateDetallePrestamo(
                            //                 this.DetallePrestamo
                            //             );
                            //         });
                            //     });

                            // esto lanza un toast de confimacion
                            Swal.fire({
                                timer: 3000,
                                showConfirmButton: false,
                                title: '¡Felicitaciones!',
                                text: `El prestamo del Libro se realizó con éxito`,
                                position: 'center',
                                icon: 'success',
                            });
                            // termina y genera un pdf en un modal, elimina los datos de la lista libros
                            this.openModal();
                            this.generarticketPrestamo(
                                this.ListaLibros,
                                this.USUARIO
                            );
                        } else {
                            Swal.fire({
                                timer: 3000,
                                showConfirmButton: false,
                                title: 'Campos imcompletos',
                                text: `No te olvides de agregar libros y determinar la fecha de caducidad del prestamo.`,
                                position: 'center',
                                icon: 'error',
                            });
                        }
                    } else {
                        Swal.fire({
                            timer: 3000,
                            showConfirmButton: false,
                            title: 'Fecha incorrecta',
                            text: `no puedes poner una fecha pasada como fecha de caducidad.`,
                            position: 'center',
                            icon: 'error',
                        });
                    }
                } else {
                    Swal.fire({
                        timer: 2000,
                        showConfirmButton: false,
                        title: 'Prestamo cancelado',
                        text: `Se cancelo el prestamo, bienvedido al dashboard.`,
                        position: 'center',
                        icon: 'error',
                    });

                    this.Cierre_boletaPrestamo();
                }
            }
        });
    }

    Cierre_boletaPrestamo() {
        this.route.navigateByUrl('/biblioteca/dashboard');
        localStorage.setItem('prev_page', '/biblioteca/prestamos');
    }

    // esto es del modal para abrir con ts
    @ViewChild('staticBackdrop', { static: true }) modalElement!: ElementRef;

    openModal() {
        const modal = new (window as any).bootstrap.Modal(
            this.modalElement.nativeElement
        );
        modal.show();
    }

    generarticketPrestamo(data: any[], User: any) {
        let nombre_de_usuario: string;
        const PDFMAKE = pdfMake;
        const modal = this.modalElement.nativeElement as HTMLDivElement;
        const modalBody: HTMLDivElement = modal.children[0].children[0]
            .children[1] as HTMLDivElement;
        const RENDER = this.render;

        const pdfIframe = RENDER.createElement('iframe');

        pdfIframe.style.width = '100%';
        pdfIframe.style.height = '700px';
        pdfIframe.style.border = 'none';

        RENDER.appendChild(modalBody, pdfIframe);

        //obtener el nombre del bibliotecario
        this.bibliotecarioService
            .getBibliotecario_name(this.Id_bibliotecario)
            .subscribe((payload: string) => {
                nombre_de_usuario = payload;
                console.log(nombre_de_usuario);
                //creamos la tabla y generamos el pdf
                //cabecaera del la tabla
                const tableHeaders = [
                    {
                        text: 'N°',
                        alignment: 'center',
                        fillColor: '#dedede',
                    },
                    {
                        text: 'Libro',
                        alignment: 'center',
                        fillColor: '#dedede',
                    },
                    {
                        text: 'Genero',
                        alignment: 'center',
                        fillColor: '#dedede',
                    },
                ];

                // Mapear la data a la fila de tabla
                const tableBody = data.map((item, i) => [
                    {
                        text: i + 1,
                    },
                    {
                        text: item.titulo,
                    },
                    {
                        text: item.genero,
                    },
                ]);

                // Insertar los encabezados al principio del cuerpo de la tabla.
                tableBody.unshift(tableHeaders);

                //Datos del prestamo
                const datos = [
                    [
                        'N°_oper:',
                        {
                            text: this.DetallePrestamo.id_prestamo
                                .toString()
                                .padStart(6, '0'),
                            font: 'IBM',
                            alignment: 'right',
                        },
                    ],
                    [
                        'Nombres            :',
                        { text: User.nombres, font: 'IBM', alignment: 'right' },
                    ],
                    [
                        'Apellido Paterno   :',
                        {
                            text: User.apellido_paterno,
                            font: 'IBM',
                            alignment: 'right',
                        },
                    ],
                    [
                        'Apellido Paterno   :',
                        {
                            text: User.apellido_materno,
                            font: 'IBM',
                            alignment: 'right',
                        },
                    ],
                    [
                        'Fecha de prestamo  :',
                        {
                            text: this.Prestamos.fecha_prestamo,
                            font: 'IBM',
                            alignment: 'right',
                        },
                    ],
                    [
                        'Fecha de Caducidad :',
                        {
                            text: this.Prestamos.fecha_caducidad,
                            font: 'IBM',
                            alignment: 'right',
                        },
                    ],
                    [
                        'Atendido por       :',
                        { text: nombre_de_usuario, alignment: 'right' },
                    ],
                ];

                //definimos el documento
                let docDefinition = {
                    pageOrientation: 'portrait',
                    pageSize: {
                        width: 126.992, //puntos para post 58mm
                        height: 'auto',
                    },
                    pageMargins: [1, 1, 1, 1], // Establece todos los márgenes a 0
                    info: {
                        title: 'Ticket Prestamo',
                    },
                    content: [
                        {
                            text: '=======================',
                        },
                        {
                            text: 'BIBLIOTECA BLIZ',
                            fontSize: 18,
                            alignment: 'center',
                        },
                        {
                            text: '=======================',
                        },
                        {
                            text: 'Tus Libros son nuestra pasión\n',
                            fontSize: 12,
                            alignment: 'center',
                        },
                        {
                            text: '\n',
                        },
                        {
                            text: 'Datos del Préstamo',
                            style: 'header',
                        },
                        {
                            layout: 'noBorders',
                            table: {
                                body: datos,
                                widths: ['auto', 'auto'],
                            },
                            fontSize: 7,
                        },
                        {
                            text: '\n',
                        },
                        {
                            layout: {
                                vLineWidth: function (i, node) {
                                    return 0;
                                }, // Establecer grosor 0 para todas las líneas verticales
                                // hLineWidth: function (i, node) {
                                //     return i === 0 || i === node.table.body.length
                                //         ? 1
                                //         : 1;
                                // },
                                hLineColor: function (i, node) {
                                    return i === 0 ||
                                        i === node.table.body.length
                                        ? 'black'
                                        : 'black';
                                },
                                hLineStyle: function (i, node) {
                                    return i === 0 ||
                                        i === node.table.body.length
                                        ? null
                                        : { dash: { length: 2 } };
                                }, // Estilo punteado
                            },
                            table: {
                                alignment: 'center',
                                headerRows: 1,
                                widths: ['auto', 'auto', 'auto'],
                                body: tableBody,
                            },
                            fontSize: 8,
                        },
                        {
                            text: '\n',
                        },
                        {
                            qr: 'Caduca el: ' + this.Prestamos.fecha_caducidad,
                            fit: 80,
                            alignment: 'center',
                        },
                        {
                            text: '\n',
                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 10,
                            margin: [0, 0, 0, 10],
                            alignment: 'center',
                        },
                    },
                    defaultStyle: {
                        font: 'Ticket', // Usar la fuente personalizada
                    },
                };

                // Generar el PDF y establecer la URL en el iframe
                PDFMAKE.createPdf(docDefinition).getDataUrl(
                    (dataUrl: string) => {
                        pdfIframe.src = dataUrl;
                    }
                );
            });
    }

    /**
     * La función `changePageLibro` actualiza la página actual para obtener una lista de libros,
     * actualiza la paginación y recupera los libros para la nueva página.
     * @param {number} page - La función `changePageLibro` toma un parámetro `page`, que es un número
     * que representa el número de página a la que navegar. Esta función actualiza la propiedad
     * `LibroCurrentPage` con el nuevo número de página, actualiza la propiedad `params.page` con el
     * nuevo número de página, crea paginación basada
     */
    changePageLibro(page: number) {
        this.LibroCurrentPage = page;
        this.params.page = this.LibroCurrentPage;
        this.createPagination(
            this.LibroTotalPages,
            this.LibroCurrentPage,
            this.LibrosPages
        );
        this.GetLibros();
    }

    // para seleccionar al usuario
    toogleChecked(cb) {
        this.Trow.forEach(elemento => {
            const trEl: HTMLTableRowElement = elemento.nativeElement;
            const checkEl = trEl.children[6].children[0]
                .children[0] as HTMLInputElement;
            if (checkEl.checked) {
                if (!cb.es_activo) {
                    Swal.fire({
                        toast: true,
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#f7576f',
                        html: `El usuario <strong>${cb.nombres}</strong> no puede ser seleccionado`,
                        position: 'top-end',
                        icon: 'error',
                        iconColor: 'white',
                        color: 'white',
                    });
                    checkEl.checked = false;
                }
            }
        });
        if (cb.es_activo) {
            this.Trow.forEach(element => {
                const trElement: HTMLTableRowElement = element.nativeElement;
                const checkboxEl: HTMLInputElement = trElement.children[6]
                    .children[0].children[0] as HTMLInputElement;

                if (!this.Selected) {
                    if (!checkboxEl.checked) {
                        checkboxEl.disabled = true;
                    }
                } else {
                    checkboxEl.disabled = false;
                }
            });
            if (!this.Selected) {
                Swal.fire({
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
                    background: '#57f77f',
                    html: `El usuario <strong>${cb.nombres}</strong> ha sido seleccionado.`,
                    position: 'top-end',
                    icon: 'success',
                    iconColor: 'black',
                });
            } else {
                this.showAlert(
                    'warning',
                    '#f7c557',
                    `El usuario <strong>${cb.nombres}</strong> ha sido deseleccionado.`
                );
            }

            // cambia dependiando si ha sido seleccionado del Usuario
            this.Selected = this.Selected ? false : true;
            this.userId = cb.id_usuario;
            this.USUARIO = cb;
        }
    }

    private showAlert(
        icon: 'success' | 'error' | 'warning',
        background: string,
        html: string
    ) {
        Swal.fire({
            toast: true,
            timer: icon === 'success' ? 3000 : 1500,
            showConfirmButton: false,
            background: background,
            html: html,
            position: 'top-end',
            icon: icon,
            iconColor: 'black',
        });
    }

    createPagination(totalPages: number, page: number, paginas: any[]) {
        let pages: any = [];
        let beforePage = page - 1;
        let afterPage = page + 1;

        if (page > 1) {
            pages.push({ type: 'prev', number: page - 1 });
        }

        if (page > 2) {
            pages.push({ type: 'page', number: 1 });
            if (page > 3) {
                pages.push({ type: 'dots' });
            }
        }

        if (page === totalPages) {
            beforePage = beforePage - 2;
        } else if (page === totalPages - 1) {
            beforePage = beforePage - 1;
        }

        if (page === 1) {
            afterPage = afterPage + 2;
        } else if (page === 2) {
            afterPage = afterPage + 1;
        }

        for (let i = beforePage; i <= afterPage; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push({ type: 'page', number: i });
            }
        }

        if (page < totalPages - 1) {
            if (page < totalPages - 2) {
                pages.push({ type: 'dots' });
            }
            pages.push({ type: 'page', number: totalPages });
        }

        if (page < totalPages) {
            pages.push({ type: 'next', number: page + 1 });
        }
        return pages;
    }

    //para el stteper
    /* El fragmento de código que proporcionó está relacionado con la gestión de la paginación y la
   visualización de páginas en un componente Angular. Analicemos la funcionalidad: */
    @ViewChildren('page') Page: QueryList<ElementRef>;

    currentPageIndex: number = 0;

    /**
     * La función `showPage` itera a través de una matriz de elementos y muestra el elemento en el
     * índice especificado mientras oculta el resto.
     * @param {number} index - El parámetro `index` en el método `showPage` se utiliza para especificar
     * qué página mostrar. El método recorre cada elemento de la página en la matriz `Page` y establece
     * el estilo de visualización en 'bloque' para la página en el índice especificado, mientras
     * establece el estilo de visualización en 'ninguno'.
     */
    showPage(index: number): void {
        this.Page.forEach((data, idx) => {
            let page = data.nativeElement as HTMLElement;
            if (idx === index) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    }

    /**
     * La función `attachButtonListeners` itera sobre cada elemento de la página y adjunta detectores
     * de eventos de clic a los botones siguiente y anterior para navegar por las páginas.
     */
    attachButtonListeners(): void {
        this.Page.forEach((data, index) => {
            let page = data.nativeElement as HTMLElement;
            let nextButton = page.querySelector('.next');
            let prevButton = page.querySelector('.prev');

            /* Este fragmento de código verifica si hay un elemento `nextButton` presente en la página
            actual que se está iterando. Si existe un elemento "nextButton", se le adjunta un
            detector de eventos para el evento "clic". Cuando se hace clic en el "botón siguiente",
            se realizan las siguientes acciones:
            1. El comportamiento predeterminado del evento de clic se evita usando
            `event.preventDefault()`.
            2. Comprueba si el "índice" actual es menor que la longitud total de la matriz "Página"
            menos 1. Esta condición garantiza que el índice no exceda el índice máximo de la matriz
            de páginas.
            3. Si se cumple la condición, `currentPageIndex` se incrementa en 1 y se llama a la
            función `showPage` con el `currentPageIndex` actualizado. Esta acción muestra
            efectivamente la página siguiente en la secuencia de paginación cambiando el estilo de
            visualización de las páginas actual y siguiente. */
            if (nextButton) {
                nextButton.addEventListener('click', event => {
                    event.preventDefault();
                    if (index < this.Page.length - 1) {
                        this.currentPageIndex++;
                        this.showPage(this.currentPageIndex);
                    }
                });
            }

            /* El fragmento de código que proporcionó maneja la funcionalidad del botón "anterior" en
            el componente de paginación. Analicemos lo que hace este código: */
            if (prevButton) {
                prevButton.addEventListener('click', event => {
                    event.preventDefault();
                    if (index > 0) {
                        this.currentPageIndex--;
                        this.showPage(this.currentPageIndex);
                    }
                });
            }
        });
    }

    // cliclos de vida del componente
    ngOnInit() {
        this.getUsuarios();
        this.GetLibros();
    }

    ngAfterViewInit(): void {
        this.showPage(this.currentPageIndex);
        this.attachButtonListeners();
    }
}
