import { LibroService } from 'src/app/Services/libroService/libro.service';
import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/Services/AutorService/autor.service';
import { UsuarioService } from 'src/app/Services/Usuarios/usuario.service';
import { PrestamoService } from 'src/app/Services/Prestamo/prestamo.service';
import { EditorialService } from 'src/app/Services/EditorialService/editorial.service';
import { UserService } from 'src/app/Services/Bibliotecario/user.service';
import { JwtAuthService } from 'src/app/Services/Auth/jwt-auth.service';
//importar modelos
import { UsuarioModel } from 'src/app/Models/Usuario/usuario.model';
import { EditorialModel } from 'src/app/Models/Editorial/editorial.model';
import { LibroModel } from 'src/app/Models/libro/libro.model';
import { LibroResult } from 'src/app/Models/libro/libro.model';
import { Autor } from 'src/app/Models/autor/autor.interfaz';
import { PrestamoModel } from 'src/app/Models/Prestamo/prestamo.model';

//PDF MAKER
// importar los modulos para el uso de pdfMake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// PdfMake end
@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    Autores: Autor[] = [];
    Libros: LibroResult[] = [];

    protected cantidadUsuarios: number;
    protected cantidadDevolucionesVenc: number;
    protected cantidadEditoriales: number;
    protected cantidadLibros: number;
    // protected nombresLibros: number;
    protected cantidadPrestamos: number;
    protected nombreBibliotecario: string;

    constructor(
        private libroService: LibroService,
        private AutorService: AutorService,
        private usuarioService: UsuarioService,
        private prestamoService: PrestamoService,
        private editorialService: EditorialService,
        private route: Router,
        private bibliotecarioService: UserService,
        private authService: JwtAuthService
    ) {
        const return_page = localStorage.getItem('prev_page');
        if (return_page) {
            this.route.navigate([return_page]);
        }
        const bibliotecarioID: number = this.authService.getUserId();
        this.bibliotecarioService
            .getBibliotecario_name(bibliotecarioID)
            .subscribe((data: string) => {
                this.nombreBibliotecario = data;
            });
    }

    cantidadAutores: number;
    Totalprestados: number;
    nombresLibros: string;

    // Editorial: number;

    ngOnInit(): void {
        this.libroService.getCantidadLibro().subscribe((data: LibroModel) => {
            this.cantidadLibros = data.count as number;
        });

        this.libroService.getTOP5Libros(5).subscribe((data: LibroModel) => {
            const data_size: number = data.count 
            this.libroService.getTOP5Libros(data_size).subscribe((data: LibroModel) =>{
                this.Libros = data.results as LibroResult[]
                this.Libros.sort((a, b) => b.prestados - a.prestados);
                this.Libros = this.Libros.filter((dato: LibroResult) =>{
                    return dato.prestados > 0
                })
            })
            // this.nombresLibros = data.titulo as string;
            console.log(this.nombresLibros)
        });
        // this.libroService.getCantidadLibro().subscribe((data: LibroModel) => {
        //     
        // });

        // this.libroService.getTOP5Libros().subscribe((data: LibroModel) => {
        //     this.nombresLibros = data.results.prestados as number;
        // });
        // this.Libros.sort((a,b) => b.prestados - a.prestados)
        // this.Libros.sort((a,b) => b.prestados - a.prestados)

        // this.Libros.sort((a, b) => b.prestados - a.prestados);
        // console.log(this.Libros)

        this.AutorService.getAutor().subscribe((data: Autor[]) => {
            this.Autores = data;
            this.cantidadAutores = this.Autores.length;
        });

        this.usuarioService.getUsuarios().subscribe((data: UsuarioModel) => {
            this.cantidadUsuarios = data.count as number;
        });

        this.prestamoService.getCantDevVencido().subscribe(count => {
            this.cantidadDevolucionesVenc = count;
        });

        this.prestamoService
            .getCantidadPrestamos()
            .subscribe((data: PrestamoModel) => {
                this.cantidadPrestamos = data.count as number;
            });

        this.editorialService
            .getCantidadEditorial()
            .subscribe((data: EditorialModel) => {
                this.cantidadEditoriales = data.count as number;
            });
    }
}
