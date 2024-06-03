export interface CreateLibroModel {
    id_libro?: number;
    titulo: string;
    anio_publicacion: number;
    cantidad: number;
    descripcion: string;
    id_autor: number;
    id_genero: number;
    id_proveedor: number;
    id_bibliotecario: number;
}

export interface FormLibroModel {
    id_libro: string | number; // Assuming id_libro is either a string or a number
    titulo: string;
    anio_publicacion: number;
    cantidad: number;
    descripcion: string;
    id_autor: number;
    id_genero: number;
    id_proveedor: number;
    id_bibliotecario: number;
    id_editorial: number; // Assuming there's a property named 'id_editorial' in your model
}

export interface LibroModelList {
    count: number;
    next: string;
    previous: string;
    results: LibroModelListResult[];
}

export interface LibroModelListResult {
    id: number;
    titulo: string;
    genero: string;
    anio_publicacion: string;
    autor: string;
    editorial: string;
    cantidad: string;
    descripcion: string;
    prestados: number;
    devuelto: number;
    id_autor?: number;
    id_genero?: number;
    id_proveedor?: number;
    id_bibliotecario: number;
    id_editorial?: number
}

export interface DeleteLibroModel {
    id_libro: number; // Identificador único del libro a eliminar
}
