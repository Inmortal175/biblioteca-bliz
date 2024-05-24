import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { ReportePrestamoService } from 'src/app/Services/Reportes/reporte-prestamo.service';

//PDF MAKER
// importar los modulos para el uso de pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// PdfMake end
@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
    constructor(private reportePrestamoService: ReportePrestamoService) {}

    // funcion que crea el pdf
    // createPdf() {
    // }
    //end pdfMake

    ViewReportes() {
        // let docDefinition = {
        //     content: 'This is an sample PDF printed with pdfMake',
        // };
        const PDFMAKE = pdfMake;
        // pdfMake.createPdf(docDefinition).open();
        this.reportePrestamoService
            .GetReportePrestamos()
            .subscribe((data: any[]) => {
                // Define the table headers
                const tableHeaders = [
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
                        text: 'caduca',
                        bold: true,
                        alignment: 'center',
                        fillColor: '#dedede',
                    },
                ];

                // Map the data to the table rows
                const tableBody = data.map(item => [
                    {
                        text: item.usuario,
                    },
                    {
                        text: item.libro,
                    },
                    {
                        text: item.genero_libro,
                    },
                    {
                        text: item.bibliotecario,
                    },
                    {
                        text: item.fecha_prestamo,
                    },
                    {
                        text: item.estado_devolucion,
                    },
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
                    {
                        text: item.fecha_caducidad,
                    },
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
                            fontSize: 20,
                            bold: true,
                            alignment: 'center',
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
                        },
                    },
                };
                PDFMAKE.createPdf(docDefinition).open();
            });
    }
}
