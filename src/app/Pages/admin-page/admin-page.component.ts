import { NacionalidadService } from './../../Services/Nacionalidad/nacionalidad.service';
import { ProveedorService } from './../../Services/Proveedores/proveedores.service';
import { GeneroService } from './../../Services/Genero/genero.service';
import { AutorService } from './../../Services/Autor/autor.service';
import { EditorialService } from '../../Services/Editorial/editorial.service';
import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/Interfaces/autor';
import { Editorial } from 'src/app/Interfaces/editorial';
import { Genero } from 'src/app/Interfaces/genero';
import { Proveedor } from 'src/app/Interfaces/proveedores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nacionalidad } from 'src/app/Interfaces/nacionalidad';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
    autores: Autor[] = [];
    editoriales: Editorial[] = [];
    generos: Genero[] = [];
    proveedores: Proveedor[] = [];
    nacionalidades: Nacionalidad[] = [];

    autorSeleccionado: Autor | null = null;
    mostrarBotonActualizar: boolean = false;
    mostrarBotonAdd: boolean = true;

    public formAutor: FormGroup;

    constructor(
        private AutorService: AutorService,
        private EditorialService: EditorialService,
        private GeneroService: GeneroService,
        private ProveedorService: ProveedorService,
        private NacionalidadService: NacionalidadService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.cargarAutores()

        this.EditorialService.getEditorial().subscribe((data: Editorial[]) => {
            this.editoriales = data;
            console.log(this.editoriales);
        });

        this.GeneroService.getGenero().subscribe((data: Genero[]) => {
            this.generos = data;
            console.log(this.generos);
        });

        this.ProveedorService.getProveedor().subscribe((data: Proveedor[]) => {
            this.proveedores = data;
            console.log(this.proveedores);
        });

        this.NacionalidadService.getNacionalidad().subscribe(
            (data: Nacionalidad[]) => {
                this.nacionalidades = data;
                console.log(this.nacionalidades);
            }
        );

        //Formularios
        this.formAutor = this.formBuilder.group({
            nombres: ['', [Validators.required]],
            apellido_paterno: ['', [Validators.required]],
            apellido_materno: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
        });
    }

    //Leer, Agregar, eliminar y actualizar un Autor
    cargarAutores(): void {
      this.AutorService.getAutor().subscribe((data: Autor[]) => {
        this.autores = data;
        console.log(this.autores);
    });
    }

    sendAutor(): void {
        if (this.formAutor.valid) {
            const formValue = this.formAutor.value;
            const nuevoAutor = {
                ...formValue,
                nacionalidad: Number(formValue.nacionalidad), // Convertir a número
            };
            this.AutorService.addAutor(nuevoAutor).subscribe({
                next: data => {
                    console.log('Autor añadido exitosamente:', data);
                    this.autores.push(data);
                    this.formAutor.reset(); // Resetear el formulario después de enviarlo
                },
                error: error => {
                    console.error('Error añadiendo autor:', error);
                },
            });
        }
    }

    deleteAutor(id: number): void {
      this.AutorService.deleteAutor(id).subscribe(
        () => {
          console.log('Autor eliminado exitosamente');
          this.autores = this.autores.filter(objeto => objeto.id_autor !== id);
          //this.cargarAutores(); // Recargar la lista de autores después de eliminar uno
        },
        error => console.error('Error al eliminar autor:', error)
      );
    }

    cargarDetallesAutor(id: number): void {
      this.AutorService.getAutorById(id).subscribe(
        (autor: Autor) => {
          this.autorSeleccionado = autor;
          // Asignar detalles del autor al formulario
          this.formAutor.patchValue({
            nombres: autor.nombres,
            apellido_paterno: autor.apellido_paterno,
            apellido_materno: autor.apellido_materno,
            nacionalidad: autor.nacionalidad
          });
        },
        error => console.error('Error al cargar detalles del autor:', error)
      );
    }

    editarAutor(id: number): void {
      this.cargarDetallesAutor(id);
      this.mostrarBotonActualizar = true;
      this.mostrarBotonAdd = false;
      // Aquí podrías mostrar un modal o cambiar a una página de edición
    }

    actualizarAutor(): void {
      if (this.formAutor.valid && this.autorSeleccionado) {
        const formValue = this.formAutor.value;
        const autorActualizado: Autor = {
          ...this.autorSeleccionado,
          nombres: formValue.nombres,
          apellido_paterno: formValue.apellido_paterno,
          apellido_materno: formValue.apellido_materno,
          nacionalidad: formValue.nacionalidad
        };
        this.AutorService.actualizarAutor(autorActualizado).subscribe(
          () => {
            console.log('Autor actualizado exitosamente');
            this.mostrarBotonActualizar = false;
            this.mostrarBotonAdd = true;
            this.cargarAutores();
            this.formAutor.reset();
          },
          error => console.error('Error al actualizar autor:', error)
        );

      }
    }

    getGentilicioNacionalidad(idNacionalidad: any): string {
      const nacionalidad = this.nacionalidades.find(n => n.id_nacionalidad === Number(idNacionalidad));
      return nacionalidad ? nacionalidad.gentilicio : '';
    }
}
