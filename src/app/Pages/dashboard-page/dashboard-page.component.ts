import { LibroService } from 'src/app/Services/libroService/libro.service';
import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/Services/AutorService/autor.service';
import { UsuarioService } from 'src/app/Services/Usuarios/usuario.service';
import { PrestamoService } from 'src/app/Services/Prestamo/prestamo.service';
import { EditorialService } from 'src/app/Services/EditorialService/editorial.service';
//importar modelos
import { UsuarioModel } from 'src/app/Models/Usuario/usuario.model';
import { EditorialModel } from 'src/app/Models/Editorial/editorial.model';
import { LibroModel } from 'src/app/Models/libro/libro.model';
import { Autor } from 'src/app/Models/autor/autor.interfaz';
import { PrestamoModel } from 'src/app/Models/Prestamo/prestamo.model';

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
    constructor(
        private reportePrestamoService: ReportePrestamoService,
        private route: Router
    ) {
        const return_page = localStorage.getItem('prev_page');
        if (return_page) {
            this.route.navigate([return_page]);
        }
    }
export class DashboardPageComponent implements OnInit {
    Autores: Autor[] = [];

    protected cantidadUsuarios: number;
    protected cantidadDevolucionesVenc: number;
    protected cantidadEditoriales: number;
    protected cantidadLibros: number;
    protected nombresLibros: string;
    protected cantidadPrestamos: number;

    constructor(
        private libroService: LibroService,
        private AutorService: AutorService,
        private usuarioService: UsuarioService,
        private prestamoService: PrestamoService,
        private editorialService: EditorialService
    ) {}

    cantidadAutores: number;
    Totalprestados: number;
    // Editorial: number;

    ngOnInit(): void {
        this.libroService.getCantidadLibro().subscribe((data: LibroModel) => {
            this.cantidadLibros = data.count as number;
            console.log(data)
        });

        this.AutorService.getAutor().subscribe((data: Autor[]) => {
            this.Autores = data;
            this.cantidadAutores = this.Autores.length;
            console.log(this.Autores);
    
        });

        this.usuarioService.getUsuarios().subscribe((data: UsuarioModel) =>{
            this.cantidadUsuarios = data.count as number
            console.log(data)
        });

        this.prestamoService.getCantDevVencido().subscribe(count =>{
            this.cantidadDevolucionesVenc = count
        });

        this.prestamoService.getCantidadPrestamos().subscribe((data: PrestamoModel) => {
            this.cantidadPrestamos = data.count as number
            console.log(data)
        })

        this.editorialService.getCantidadEditorial().subscribe((data: EditorialModel) =>{
            this.cantidadEditoriales = data.count as number
            console.log(data)
        });

        this.libroService.getTOP5Libros().subscribe((data: LibroModel[]) => {
            this.nombresLibros = data.sort((a, b) => b.prestados - a.prestados);
            console.log(this.nombresLibros);
        });
        
    }
}