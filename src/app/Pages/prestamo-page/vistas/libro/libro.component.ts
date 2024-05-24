import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  userSelectForm: FormGroup;
  libros: any[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel Garcia', genero: 'Realismo magico' },
    { id: 2, titulo: 'Perfume', autor: 'Patrick Suskind', genero: 'Novela de horror' },
    { id: 3, titulo: 'El principito', autor: 'J.R.R Tolkien', genero: 'Fantasía épica' }
  ];
  prestamosSeleccionados: any[] = [];
  mostrarTablaLibros: boolean = false;

  constructor(private router: Router) {}

  gestionarSeleccion(libro: any) {
    if (this.prestamosSeleccionados.includes(libro)) {
        this.prestamosSeleccionados = this.prestamosSeleccionados.filter(item => item !== libro);
        if (this.prestamosSeleccionados.length === 0) {
            this.mostrarTablaLibros = false;
        }
    } else {
        this.prestamosSeleccionados.push(libro);
        this.mostrarTablaLibros = true;
    }
}

  eliminarPrestamo(prestamo: any) {
    this.prestamosSeleccionados = this.prestamosSeleccionados.filter(item => item !== prestamo);
  }

  Volver_casa(){
    this.router.navigate(['biblioteca/dashboard'])
  }

  // Agregar_libro() {
  //   const SelectUserSwal = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger',
  //     },
  //     buttonsStyling: false,
  //   });

  //   Swal.fire({
  //     title: "Estas seguro?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Si, eliminar!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  // }

  // Eliminar_libro() {
  //   const SelectUserSwal = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger',
  //     },
  //     buttonsStyling: false,
  //   });

  //   Swal.fire({
  //     title: "Estas seguro?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Si, eliminar!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  // }

  Volver_Libro() {
    const SelectUserSwal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    SelectUserSwal.fire({
      title: 'Estas seguro de volver?',
      text: 'esta accion es ireversiblbe!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, continuar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['biblioteca/prestamos/user'])
        SelectUserSwal.fire({
          title: 'Ya no hay libros seleccionados',
          text: 'se quitaron los libros de la canasta',
          icon: 'success',
        });
      }
    });
  }
  
  Mostrar_Detalle() {
    Swal.fire({
      title: "Estas a punto de generar el detalle prestamo?",
      text: "Estas seguro de hacerlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Guardado!",
          text: "Con exito.",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            // Mostrar el div oculto al confirmar la acción
            const divOculto = document.getElementById('Detalle Prestamo');
            if (divOculto) {
              divOculto.style.display = 'block';
            }
          }
        });
      }
    });
  }
}