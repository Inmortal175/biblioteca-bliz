import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  userSelectForm: FormGroup;

    constructor(private fb: FormBuilder, private route: Router) {
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

    Ir_Libro(){
      this.route.navigate(['biblioteca/prestamos/libro'])
    }

}
