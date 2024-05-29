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
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {}
