import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-prestamo-page',
    templateUrl: './prestamo-page.component.html',
    styleUrls: ['./prestamo-page.component.css'],
})
export class PrestamoPageComponent {
    userSelectForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.userSelectForm = this.fb.group({
            seleccion: false,
        });
    }
    ContenedorUiUsuarioOculto: boolean = false;
    ContenedorUiLibroOculto: boolean = false;

    moverseHaciaDetallePrestamo() {
        this.ContenedorUiUsuarioOculto = true;
    }

    SelectUserConfirm() {
        // const SelectUserSwal = Swal.mixin({
        //     customClass: {
        //         confirmButton: 'btn btn-success',
        //         cancelButton: 'btn btn-danger',
        //     },
        //     buttonsStyling: false,
        // });
        // SelectUserSwal.fire({
        //     title: 'estas seguro?',
        //     text: 'esta accion no es ireversiblbe!',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'si, continuar!',
        //     cancelButtonText: 'No, cancelar!',
        //     reverseButtons: true,
        // }).then(result => {
        //     if (result.isConfirmed) {
        //         SelectUserSwal.fire({
        //             title: 'usuario Seleccionado!',
        //             text: 'ha seleccionado al Usuario Gaby',
        //             icon: 'success',
        //         });
        //     } else if (
        //         /* Read more about handling dismissals below */
        //         result.dismiss === Swal.DismissReason.cancel
        //     ) {
        //         SelectUserSwal.fire({
        //             title: 'Cancelled',
        //             text: 'Your imaginary file is safe :)',
        //             icon: 'error',
        //         });
        //     }
        // });
    }
}
