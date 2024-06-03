import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

//importar modelos
import {
    ReporteDevolucionModel,
    ReporteDevolucionModelResult,
    ReporteDevolucionParams,
} from 'src/app/Models/Reportes/Devolucion/devolucion_reporte.model';
import { Observable } from 'rxjs';
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
export class ReporteDevolucionService {
    constructor(private http: HttpClient) {}

    getReporteDevolucion(
        devolParam: ReporteDevolucionParams
    ): Observable<ReporteDevolucionModel> {
        const httpOptions = {
            params: new HttpParams()
                .set('bibliotecario', devolParam.bibliotecario)
                .set('fecha_inicio', devolParam.fecha_inicio)
                .set('fecha_fin', devolParam.fecha_limite)
                .set('usuario', devolParam.usuario)
                .set('page', devolParam.page)
                .set('page_size', devolParam.page_size),
        };
        return this.http.get<ReporteDevolucionModel>(
            `${base_url}reporte_devoluciones/`,
            httpOptions
        );
    }

    getPdfReporteDevoluciones(
        devolucionFilter: ReporteDevolucionParams
    ): Observable<string> {
        return new Observable(observer => {
            this.getReporteDevolucion(devolucionFilter).subscribe(
                (data: ReporteDevolucionModel) => {
                    // Actualizar el tamaño de la página con el recuento total de datos
                    devolucionFilter.page_size = data.count;
                    // Realizar una segunda solicitud HTTP con el tamaño de página actualizado
                    this.getReporteDevolucion(devolucionFilter).subscribe(
                        (fullData: ReporteDevolucionModel) => {
                            this.generarPdfUrlDevoluciones(
                                fullData.results
                            ).then(
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

    private generarPdfUrlDevoluciones(
        data: ReporteDevolucionModelResult[]
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const PDFMAKE = pdfMake;

            PDFMAKE.fonts = {
                Roboto: {
                    normal: 'Roboto-Regular.ttf',
                    bold: 'Roboto-Medium.ttf',
                    italics: 'Roboto-Italic.ttf',
                    bolditalics: 'Roboto-MediumItalic.ttf',
                },
                Arial: {
                    normal: 'Arial-Regular.ttf',
                    bold: 'Arial-Bold.ttf',
                    italics: 'Arial-Italic.ttf',
                },
                Ticket: {
                    normal: 'Ticketing.ttf',
                    bold: 'Ticketing.ttf',
                },
                IBM: {
                    normal: 'IBMPlexMono-SemiBold.ttf',
                    bold: 'IBMPlexMono-SemiBold.ttf',
                },
                Montserrat: {
                    normal: 'Montserrat-Regular.ttf',
                    bold: 'Montserrat-Bold.ttf',
                    italics: 'Montserrat-Italic.ttf',
                },
            };

            // Definir la estructura del documento
            let docDefinition = {
                pageSize: 'A4',
                info: {
                    title: 'Reporte de Devoluciones',
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
                    { text: 'Reporte de Devoluciones', style: 'header' },
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
                        fontSize: 11,
                        color: 'black',
                        alignment: 'center',
                        fillColor: '#dedede',
                    },
                    tableContent: {
                        fontSize: 9,
                        font: 'Arial',
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

    private buildTable(data: ReporteDevolucionModelResult[]): any {
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
                ],
                body: [
                    [
                        { text: 'N°', style: 'tableHeader' },
                        { text: 'Libro', style: 'tableHeader' },
                        { text: 'Nombres', style: 'tableHeader' },
                        { text: 'Apellido Paterno', style: 'tableHeader' },
                        { text: 'Apellido Materno', style: 'tableHeader' },
                        { text: 'Bibliotecario', style: 'tableHeader' },
                        { text: 'Fecha de Devolución', style: 'tableHeader' },
                    ],
                    ...data.map(devolucion => [
                        (data.indexOf(devolucion) + 1)
                            .toString()
                            .padStart(2, '0'),
                        { text: devolucion.libro, style: 'tableContent' },
                        { text: devolucion.nombres, style: 'tableContent' },
                        {
                            text: devolucion.apellido_paterno,
                            style: 'tableContent',
                        },
                        {
                            text: devolucion.apellido_materno,
                            style: 'tableContent',
                        },
                        {
                            text: devolucion.bibliotecario,
                            style: 'tableContent',
                        },
                        {
                            text: devolucion.fecha_devolucion,
                            style: 'tableContent',
                        },
                    ]),
                ],
            },
        };
    }
}
