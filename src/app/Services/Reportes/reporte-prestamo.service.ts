import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { base_url } from 'src/app/Models/Url/urls.model';
import {
    PrestamosFilter,
    ReportePrestamosModel,
    ReportePrestamoModel,
} from 'src/app/Models/Reportes/Prestamo/reportePrestamo.model';
import { Observable, from, map, switchMap } from 'rxjs';

// importar los modulos para el uso de pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import  CustomPdfFonts from 'src/assets/fonts/pdfmake-fonts';
import * as CustomPdfFonts from 'src/assets/fonts/CustomFonts.js';

pdfMake.vfs = { ...pdfFonts.pdfMake.vfs, ...CustomPdfFonts.pdfMake.vfs };
// PdfMake end

import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root',
})
export class ReportePrestamoService {
    constructor(private EndPoints: HttpClient) {}

    obtenerReportePrestamos(
        params: PrestamosFilter
    ): Observable<ReportePrestamosModel> {
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

    GetReportePrestamos(
        params: PrestamosFilter
    ): Observable<ReportePrestamoModel[]> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: new HttpParams()
                .set('usuario', params.usuario)
                .set('title', params.titulo)
                .set('bibliotecario', params.bibliotecario)
                .set('fecha_inicio', params.fecha_inicio)
                .set('fecha_limite', params.fecha_limite),
        };

        // Crear parámetros de consulta

        return this.EndPoints.get<ReportePrestamoModel[]>(
            `${base_url}reporte_prestamo/`,
            httpOptions
        );
    }

    PdfReportePrestamos(params: PrestamosFilter): Observable<string> {
        return this.GetReportePrestamos(params).pipe(
            switchMap((data: ReportePrestamoModel[]) => {
                return from(this.generarPdfUrlPrestamos(data));
            })
        );
    }

    // Función que genera la URL del PDF (implementa según tu lógica)
    private generarPdfUrlPrestamos(
        data: ReportePrestamoModel[]
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
            const tableHeaders = [
                {
                    text: 'N°',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Usuario',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Libro',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Gén. del Libro',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Atendido por',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Fecha de Préstamo',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Est. de Devolución',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Est. de Vencimiento',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
                {
                    text: 'Caduca',
                    bold: true,
                    alignment: 'center',
                    fillColor: '#dedede',
                },
            ];

            // Map the data to the table rows
            const tableBody = data.map(item => [
                { text: (data.indexOf(item) + 1).toString().padStart(2, '0') },
                { text: item.usuario },
                { text: item.libro },
                { text: item.genero_libro },
                { text: item.bibliotecario },
                { text: item.fecha_prestamo },
                { text: item.estado_devolucion },
                {
                    text: item.estado_devolucion.includes('Devuelto')
                        ? 'satisfecho'
                        : item.retraso,
                    fillColor: item.estado_devolucion.includes('Devuelto')
                        ? '#a1c3ff'
                        : item.retraso.includes('retraso')
                          ? '#f25555'
                          : '#27e858',
                },
                { text: item.fecha_caducidad },
            ]);

            // Insert the headers at the beginning of the table body
            tableBody.unshift(tableHeaders);

            let docDefinition = {
                pageOrientation: 'landscape',
                pageSize: 'A4',
                info: {
                    title: 'Reporte de Libros prestados',
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
                    {
                        table: {
                            layout: 'lightHorizontalLines',
                            alignment: 'center',
                            headerRows: 1,
                            widths: [
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                                'auto',
                            ],
                            body: tableBody,
                        },
                        fontSize: 10,
                    },
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
                        marginBottom: 10,
                        alignment: 'center',
                    },
                    tableHeader: {
                        bold: true,
                        alignment: 'center',
                        font: 'Montserrat',
                    },
                },
                defaultStyle: {
                    font: 'Arial', // Usar la fuente personalizada
                },
            };

            // Genera el PDF y obtiene la URL de datos
            PDFMAKE.createPdf(docDefinition).getDataUrl(dataUrl => {
                if (dataUrl) {
                    resolve(dataUrl);
                } else {
                    reject('No se pudo generar el PDF.');
                }
            });
        });
    }
}
