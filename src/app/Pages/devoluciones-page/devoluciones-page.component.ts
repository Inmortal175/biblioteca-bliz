import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-devoluciones-page',
    templateUrl: './devoluciones-page.component.html',
    styleUrls: ['./devoluciones-page.component.css'],
})
export class DevolucionesPageComponent {
    nombreUsuarioPrompt: string = '';
    nombreEnDb: string = '';
    deudasSeleccionadas: number[] = []; //Array para alamecar las IDs de las deudas seleccionadas.

    //Funcion a modifcar para buscar nombreUsuario en la db. "nombreEnDb" es lo que debe recibir la bd.
    bucarNombreEnDb(): void {
        this.nombreEnDb = this.nombreUsuarioPrompt;
        //console.log('Nombre almacenado:', this.nombreEnDb); // Solo para ver el resultado en la consola.
    }

    //Funcion a modificar para enviar la lista con IDs de los prestamos devueltos, tambien oculta el primer div para mostrar el feedback al usuario.
    EnviarListaIdPrestamosDevueltos(): void {
        Swal.fire({
            title: 'Confirmación',
            text: 'La operación fue exitosa',
            icon: 'success',
        });

        this.actualizarListaDevolucionCheckbox();
        //console.log('IDs seleccionados:', this.deudasSeleccionadas);
        //El codigo de arriba solo es un comprobante.
    }

    //Array de objetos con datos de prueba para la tabla.
    devoluciones: Array<any> = [
        {
            ID_de_prestamo: 124,
            Titulo_del_libro: 'Harry el sucio potter',
            Fecha_de_prestamo: '16-05-2024',
        },

        {
            ID_de_prestamo: 25,
            Titulo_del_libro: 'Los vergadores',
            Fecha_de_prestamo: '16-05-2024',
        },
    ];

    //logica del los checkboxes, se ejecuta al presionar el boton "Devolver libro".
    actualizarListaDevolucionCheckbox() {
        this.deudasSeleccionadas = this.devoluciones
            .filter(devolucion => devolucion.selected)
            .map(devolucion => devolucion.ID_de_prestamo);
    }
}
