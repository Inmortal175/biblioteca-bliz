import { NacionalidadService } from './../../Services/Nacionalidad/nacionalidad.service';
import { ProveedorService } from './../../Services/Proveedores/proveedores.service';
import { GeneroService } from './../../Services/Genero/genero.service';
import { AutorService } from './../../Services/Autor/autor.service';
import { EditorialService } from '../../Services/Editorial/editorial.service';
import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/Models/autor/autor';
import {
    Editorial,
    EditorialModelResult,
    EditorialModel,
} from 'src/app/Models/editorial/editorial';
import { Genero, GeneroModel } from 'src/app/Models/genero/genero';
import {
    Proveedor,
    ProveedorModel,
} from 'src/app/Models/proveedores/proveedores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nacionalidad } from 'src/app/Models/nacionalidad/nacionalidad';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
    autores: Autor[] = [];
    editoriales: EditorialModelResult[] = [];
    generos: Genero[] = [];
    proveedores: Proveedor[] = [];
    nacionalidades: Nacionalidad[] = [];

    //botones
    mostrarBotonActualizar: boolean = false;
    mostrarBotonAdd: boolean = true;

    //seleccionados
    autorSeleccionado: Autor | null = null;
    editorialSeleccionado: Editorial | null = null;
    generoSeleccionado: Genero | null = null;
    proveedorSeleccionado: Proveedor | null = null;

    //Declaracion de formularios
    protected formAutor: FormGroup;
    protected formEditorial: FormGroup;
    protected formGenero: FormGroup;
    protected formProveedor: FormGroup;

    constructor(
        private AutorService: AutorService,
        private EditorialService: EditorialService,
        private GeneroService: GeneroService,
        private ProveedorService: ProveedorService,
        private NacionalidadService: NacionalidadService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.cargarAutores();
        this.cargarEditorial();
        this.cargarGenero();
        this.cargarProveedor();
        this.cargarNacionalidad();

        //Formulario Autor
        this.formAutor = this.formBuilder.group({
            nombres: ['', [Validators.required]],
            apellido_paterno: ['', [Validators.required]],
            apellido_materno: ['', [Validators.required]],
            id_nacionalidad: ['', [Validators.required]],
        });
        //Formulario Editorial
        this.formEditorial = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            direccion: ['', [Validators.required]],
            email: ['', [Validators.required]],
            telefono: ['', [Validators.required]],
        });
        //Formulario Genero
        this.formGenero = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
        });
        //Formulario Proveedor
        this.formProveedor = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            email: ['', [Validators.required]],
            telefono: ['', [Validators.required]],
        });
    }

    cargarNacionalidad(): void {
        this.NacionalidadService.getNacionalidad().subscribe(
            (data: Nacionalidad[]) => {
                this.nacionalidades = data;
                console.log(this.nacionalidades);
            }
        );
    }

    dato_buscar = '';
    BuscarAutor(event: any) {
        this.dato_buscar = event.target.value;
        this.cargarAutores();
    }

    //Leer, Agregar, eliminar y actualizar un Autor
    cargarAutores(): void {
        this.AutorService.getAutor(this.dato_buscar).subscribe(
            (data: Autor[]) => {
                this.autores = data;
                console.log(this.autores);
            }
        );
    }
    sendAutor(): void {
        if (this.formAutor.valid) {
            const formValue = this.formAutor.value;
            const nuevoAutor = {
                ...formValue,
                id_nacionalidad: Number(formValue.id_nacionalidad), // Convertir a número
            };
            console.log(formValue);
            console.log(nuevoAutor);
            this.AutorService.addAutor(nuevoAutor).subscribe({
                next: data => {
                    console.log('Autor añadido exitosamente:', data);
                    this.cargarAutores();
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
                this.autores = this.autores.filter(
                    objeto => objeto.id_autor !== id
                );
                this.cargarAutores(); // Recargar la lista de autores después de eliminar uno
            },
            error => console.error('Error al eliminar autor:', error)
        );
    }
    editarAutor(id: number): void {
        this.cargarDetallesAutor(id);
        this.mostrarBotonActualizar = true;
        this.mostrarBotonAdd = false;
        // Aquí podrías mostrar un modal o cambiar a una página de edición
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
                    id_nacionalidad: this.getIdNacionalidad(autor.nacionalidad),
                });
            },
            error => console.error('Error al cargar detalles del autor:', error)
        );
    }
    actualizarAutor(): void {
        if (this.formAutor.valid && this.autorSeleccionado) {
            const formValue = this.formAutor.value;
            const autorActualizado = {
                ...this.autorSeleccionado,
                nombres: formValue.nombres,
                apellido_paterno: formValue.apellido_paterno,
                apellido_materno: formValue.apellido_materno,
                id_nacionalidad: Number(formValue.id_nacionalidad),
            };
            console.log(autorActualizado);
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
    //helpers
    getGentilicioNacionalidad(idNacionalidad: any): string {
        const nacionalidad = this.nacionalidades.find(
            n => n.id_nacionalidad === Number(idNacionalidad)
        );
        return nacionalidad ? nacionalidad.gentilicio : '';
    }
    getIdNacionalidad(gentilicio: string): number {
        const nacionalidad = this.nacionalidades.find(
            n => n.gentilicio === gentilicio
        );
        return nacionalidad.id_nacionalidad;
    }

    //Leer, Agregar, eliminar y actualizar Editoriales
    cargarEditorial(): void {
        this.EditorialService.getEditorial().subscribe(
            (data: EditorialModel) => {
                this.editoriales = data.results;
                console.log(this.editoriales);
            }
        );
    }
    sendEditorial(): void {
        if (this.formEditorial.valid) {
            const formValue = this.formEditorial.value;
            const nuevoEditorial = {
                ...formValue,
            };
            this.EditorialService.addEditorial(nuevoEditorial).subscribe({
                next: data => {
                    console.log('Autor añadido exitosamente:', data);
                    this.cargarEditorial();
                    this.formEditorial.reset(); // Resetear el formulario después de enviarlo
                },
                error: error => {
                    console.error('Error añadiendo editorial:', error);
                },
            });
        }
    }
    deleteEditorial(id: number): void {
        this.EditorialService.deleteEditorial(id).subscribe(
            () => {
                console.log('Editorial eliminado exitosamente');
                this.autores = this.autores.filter(
                    objeto => objeto.id_autor !== id
                );
                this.cargarEditorial();
            },
            error => console.error('Error al eliminar autor:', error)
        );
    }
    editarEditorial(id: number): void {
        this.cargarDetallesEditorial(id);
        this.mostrarBotonActualizar = true;
        this.mostrarBotonAdd = false;
    }
    cargarDetallesEditorial(id: number): void {
        this.EditorialService.getEditorialById(id).subscribe(
            (editorial: Editorial) => {
                this.editorialSeleccionado = editorial;
                // Asignar detalles del autor al formulario
                this.formEditorial.patchValue({
                    nombre: editorial.nombre,
                    direccion: editorial.direccion,
                    email: editorial.email,
                    telefono: editorial.telefono,
                });
            },
            error => console.error('Error al cargar detalles del autor:', error)
        );
    }
    actualizarEditorial(): void {
        if (this.formEditorial.valid && this.editorialSeleccionado) {
            const formValue = this.formEditorial.value;
            const editorialActualizado = {
                ...this.editorialSeleccionado,
                nombre: formValue.nombre,
                direccion: formValue.direccion,
                email: formValue.email,
                telefono: formValue.telefono,
            };
            this.EditorialService.actualizarEditorial(
                editorialActualizado
            ).subscribe(
                () => {
                    console.log('Editorial actualizado exitosamente');
                    this.mostrarBotonActualizar = false;
                    this.mostrarBotonAdd = true;
                    this.cargarEditorial();
                    this.formEditorial.reset();
                },
                error => console.error('Error al actualizar autor:', error)
            );
        }
    }

    //Leer, Agregar, eliminar y actualizar Genero
    cargarGenero(): void {
        this.GeneroService.getGenero().subscribe((data: GeneroModel) => {
            this.generos = data.results;
            console.log(this.generos);
        });
    }
    deleteGenero(id: number): void {
        this.GeneroService.deleteGenero(id).subscribe(
            () => {
                console.log('Genero eliminado exitosamente');
                this.generos = this.generos.filter(
                    objeto => objeto.id_genero !== id
                );
                this.cargarGenero();
            },
            error => console.error('Error al eliminar autor:', error)
        );
    }
    sendGenero(): void {
        if (this.formGenero.valid) {
            const formValue = this.formGenero.value;
            const nuevoGenero = {
                ...formValue,
            };
            this.GeneroService.addGenero(nuevoGenero).subscribe({
                next: data => {
                    console.log('Genero añadido exitosamente:', data);
                    this.cargarGenero();
                    this.formGenero.reset(); // Resetear el formulario después de enviarlo
                },
                error: error => {
                    console.error('Error añadiendo editorial:', error);
                },
            });
        }
    }
    editarGenero(id: number): void {
        this.cargarDetallesGenero(id);
        this.mostrarBotonActualizar = true;
        this.mostrarBotonAdd = false;
    }
    cargarDetallesGenero(id: number): void {
        this.GeneroService.getGeneroById(id).subscribe(
            (genero: Genero) => {
                this.generoSeleccionado = genero;
                this.formGenero.patchValue({
                    nombre: genero.nombre,
                    descripcion: genero.descripcion,
                });
            },
            error =>
                console.error('Error al cargar detalles del genero:', error)
        );
    }
    actualizarGenero(): void {
        if (this.formGenero.valid && this.generoSeleccionado) {
            const formValue = this.formGenero.value;
            const generoActualizado = {
                ...this.generoSeleccionado,
                nombre: formValue.nombre,
                descripcion: formValue.descripcion,
            };
            this.GeneroService.actualizarGenero(generoActualizado).subscribe(
                () => {
                    console.log('Genero actualizado exitosamente');
                    this.mostrarBotonActualizar = false;
                    this.mostrarBotonAdd = true;
                    this.cargarGenero();
                    this.formGenero.reset();
                },
                error => console.error('Error al actualizar genero:', error)
            );
        }
    }

    //Leer, Agregar, eliminar y actualizar Proveedor
    cargarProveedor(): void {
        this.ProveedorService.getProveedor().subscribe(
            (data: ProveedorModel) => {
                this.proveedores = data.results;
                console.log(this.proveedores);
            }
        );
    }
    sendProveedor(): void {
        if (this.formProveedor.valid) {
            const formValue = this.formProveedor.value;
            const nuevoProveedor = {
                ...formValue,
            };
            this.ProveedorService.addProveedor(nuevoProveedor).subscribe({
                next: data => {
                    console.log('Proveedor añadido exitosamente:', data);
                    this.cargarProveedor();
                    this.formProveedor.reset(); // Resetear el formulario después de enviarlo
                },
                error: error => {
                    console.error('Error añadiendo Proveedor:', error);
                },
            });
        }
    }
    deleteProveedor(id: number): void {
        this.ProveedorService.deleteProveedor(id).subscribe(
            () => {
                console.log('Proveedor eliminado exitosamente');
                this.proveedores = this.proveedores.filter(
                    objeto => objeto.id_proveedor !== id
                );
                this.cargarProveedor();
            },
            error => console.error('Error al eliminar proveedor:', error)
        );
    }
    editarProveedor(id: number): void {
        this.cargarDetallesProveedor(id);
        this.mostrarBotonActualizar = true;
        this.mostrarBotonAdd = false;
    }
    cargarDetallesProveedor(id: number): void {
        this.ProveedorService.getProveedorById(id).subscribe(
            (proveedor: Proveedor) => {
                this.proveedorSeleccionado = proveedor;
                this.formProveedor.patchValue({
                    nombre: proveedor.nombre,
                    email: proveedor.email,
                    telefono: proveedor.telefono,
                });
            },
            error =>
                console.error('Error al cargar detalles del proveedor:', error)
        );
    }
    actualizarProveedor(): void {
        if (this.formProveedor.valid && this.proveedorSeleccionado) {
            const formValue = this.formProveedor.value;
            const proveedorActualizado = {
                ...this.proveedorSeleccionado,
                nombre: formValue.nombre,
                email: formValue.email,
                telefono: formValue.telefono,
            };
            this.ProveedorService.actualizarProveedor(
                proveedorActualizado
            ).subscribe(
                () => {
                    console.log('Proveedor actualizado exitosamente');
                    this.mostrarBotonActualizar = false;
                    this.mostrarBotonAdd = true;
                    this.cargarProveedor();
                    this.formProveedor.reset();
                },
                error => console.error('Error al actualizar proveedor:', error)
            );
        }
    }
}
