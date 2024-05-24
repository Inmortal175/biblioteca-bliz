import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-usuarios-page',
    templateUrl: './usuarios-page.component.html',
    styleUrls: ['./usuarios-page.component.css'],
})
export class UsuariosPageComponent {
    //Bloque de datos para registrar a un usuario.
    nombresAregistrar: string = '';
    apellidoPatAregistrar: string = '';
    apellidoMatAregistrar: string = '';
    telefonoAregistrar: string = '';
    emailAregistrar: string = '';

    nuevoUsuario: any = {};

    //Bloque de datos para modificar datos del usuario.
    idUsuarioSeleccionado: number = 0;
    promptNombres: string = '';
    promptPaterno: string = '';
    promptMaterno: string = '';
    promptTelefono: string = '';
    promptEmail: string = '';

    usuarioSeleccionado: any = {};

    //Datos de prueba, se deben reemplazar los datos Dentro del objeto "Usuarios" por de la BD.
    usuarios: Array<any> = [
        {
            id_usuario: 1,
            nombres: 'Sideral',
            apellidos: 'Carrion Beba',
            bibliotecario: 'Mascali',
        },
        {
            id_usuario: 2,
            nombres: 'Dina',
            apellidos: 'Paujar Rolex',
            bibliotecario: 'Papu Misterioso',
        },
    ];

    editarUsuario(usuarioId: number) {
        this.idUsuarioSeleccionado = usuarioId;
        //console.log('Editando usuario con id:', usuarioId);
        //El codigo de arriba solo es un comprobante.
    }

    eliminarUsuario(usuarioId: number) {
        this.idUsuarioSeleccionado = usuarioId;
        //console.log('Eliminando usuario con id:', usuarioId);
        //El codigo de arriba solo es un comprobante.

        Swal.fire({
            title: 'Eliminación',
            text: 'Se ha eliminado el usuario',
            icon: 'warning',
            showConfirmButton: true,
        });
    }

    //Resgistra al nuevo usuario con los datos proporcionados en la primera interfaz.
    registrarUsuario() {
        this.nuevoUsuario = {
            nombres: this.nombresAregistrar,
            apellidoPaterno: this.apellidoPatAregistrar,
            apellidoMaterno: this.apellidoMatAregistrar,
            telefono: this.telefonoAregistrar,
            email: this.emailAregistrar,
        };
        //console.log(this.nuevoUsuario);
        //El codigo de arriba solo es un comprobante.

        Swal.fire({
            title: 'Confirmación',
            text: 'Se ha registrado el usuario',
            icon: 'success',
        });
    }

    //Actualiza el objeto que almacena los siguientes datos:
    actualizarDatosUsuario() {
        this.usuarioSeleccionado = {
            id_usuario: this.idUsuarioSeleccionado,
            nombres: this.promptNombres,
            apellidoPaterno: this.promptPaterno,
            apellidoMaterno: this.promptMaterno,
            telefono: this.promptTelefono,
            email: this.promptEmail,
        };
        //console.log(this.usuarioSeleccionado);
        //El codigo de arriba solo es un comprobante.

        Swal.fire({
            title: 'Confirmación',
            text: 'La operación fue exitosa',
            icon: 'success',
        });
    }
}
