import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

//importacion de modelos
import {
    ReporteModelUsuarioResult,
    ReporteUsuarioModel,
    ReporteUsuarioParams,
} from 'src/app/Models/Reportes/Usuario/usuario_reporte.model';
import { Observable, from, switchMap } from 'rxjs';
import { base_url } from 'src/app/Models/Url/urls.model';

// importar los modulos para el uso de pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import  CustomPdfFonts from 'src/assets/fonts/pdfmake-fonts';
import * as CustomPdfFonts from 'src/assets/fonts/CustomFonts.js';

pdfMake.vfs = { ...pdfFonts.pdfMake.vfs, ...CustomPdfFonts.pdfMake.vfs };
// PdfMake end

@Injectable({
    providedIn: 'root',
})
export class ReporteUsuarioService {
    constructor(private http: HttpClient) {}

    getReporteUsuarios(
        reporteUsuarioQueryParam: ReporteUsuarioParams
    ): Observable<ReporteUsuarioModel> {
        const httpOptions = {
            params: new HttpParams()
                .set('bibliotecario', reporteUsuarioQueryParam.bibliotecario)
                .set('fecha_inicio', reporteUsuarioQueryParam.fecha_inicio)
                .set('fecha_fin', reporteUsuarioQueryParam.fecha_limite)
                .set('page', reporteUsuarioQueryParam.page)
                .set('page_size', reporteUsuarioQueryParam.page_size),
        };

        return this.http.get<ReporteUsuarioModel>(
            `${base_url}reporte_usuario/`,
            httpOptions
        );
    }

    /**
     * La función `pdfReporteUsuarios` genera un informe en PDF para una lista de usuarios según
     * parámetros especificados.
     * @param {ReporteUsuarioParams} usuarioFilter - La función `pdfReporteUsuarios` toma un parámetro
     * `usuarioFilter` de tipo `ReporteUsuarioParams`. Este parámetro se utiliza para filtrar los datos
     * del informe para generar un informe PDF.
     * @returns Esta función devuelve un Observable de tipo cadena.
     */
    pdfReporteUsuarios(
        usuarioFilter: ReporteUsuarioParams
    ): Observable<string> {
        return new Observable(observer => {
            this.getReporteUsuarios(usuarioFilter).subscribe(
                (data: ReporteUsuarioModel) => {
                    // Actualizar el tamaño de la página con el recuento total de datos
                    usuarioFilter.page_size = data.count;
                    // Realizar una segunda solicitud HTTP con el tamaño de página actualizado
                    this.getReporteUsuarios(usuarioFilter).subscribe(
                        (fullData: ReporteUsuarioModel) => {
                            this.generarPdfUrlUsuarios(fullData.results).then(
                                (pdfUrl: string) => {
                                    observer.next(pdfUrl);
                                    observer.complete();
                                },
                                error => {
                                    observer.error(error);
                                }
                            );
                        },
                        error => {
                            observer.error(error);
                        }
                    );
                },
                error => {
                    observer.error(error);
                }
            );
        });
    }

    private generarPdfUrlUsuarios(
        data: ReporteModelUsuarioResult[]
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const PDFMAKE = pdfMake;

            // Definir la estructura del documento
            let docDefinition = {
                pageOrientation: 'landscape',
                pageSize: 'A4',
                info: {
                    title: 'Reporte de Usuarios Registrados',
                },
                content: [
                    {
                        text: 'BIBLIOTECA BLIZ',
                        fontSize: 22,
                        bold: true,
                        alignment: 'center',
                        font: 'Roboto',
                    },
                    {
                        text: 'Tus Libros son nuestra pasión\n',
                        fontSize: 14,
                        alignment: 'center',
                    },
                    {
                        text: '\n',
                    },
                    { text: 'Reporte de Préstamos', style: 'header' },
                    this.buildTable(data),

                    {
                        text: '\n',
                    },
                    {
                        text: 'Nota:\n',
                        bold: true,
                    },
                    {
                        text: 'Este documento es emitido con el propósito de servir a los fines pertinentes de la Biblioteca Bliz, garantizando la correcta gestión de sus recursos y servicios. Asimismo, es importante destacar que, si bien este documento no posee validez legal, su contenido es fundamental para el adecuado funcionamiento y registro de las actividades bibliotecarias.\n \n',
                        fontSize: 10,
                        alignment: 'justify',
                    },
                    {
                        qr: 'Documento oficial, generdo el: ' + new Date(),
                        alignment: 'center',
                        fit: 130,
                    }, // para generar QR automaticamente
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
            };

            // Genera el PDF y obtiene la URL de datos
            PDFMAKE.createPdf(docDefinition).getDataUrl((dataUrl: string) => {
                if (dataUrl) {
                    resolve(dataUrl);
                } else {
                    reject('No se pudo generar el PDF.');
                }
            });
        });
    }

    private buildTable(data: ReporteModelUsuarioResult[]): any {
        return {
            table: {
                widths: [
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                ],
                body: [
                    [
                        {
                            text: 'N°',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Nombres',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Apellido Paterno',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Apellido Materno',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Estado',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Cant. Préstamos',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Fecha de Creación',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                        {
                            text: 'Agregado por',
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#dedede',
                        },
                    ],
                    ...data.map(usuario => [
                        (data.indexOf(usuario) + 1).toString().padStart(2, '0'),
                        usuario.nombres,
                        usuario.apellido_paterno,
                        usuario.apellido_materno,
                        usuario.es_activo ? 'activo' : 'Inactivo',
                        usuario.cant_prestamos.toString(),
                        this.formatDate(usuario.fecha_creacion),
                        usuario.agregado_por,
                    ]),
                ],
            },
        };
    }

    private formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options).replace(',', ' a las');
    }
}
