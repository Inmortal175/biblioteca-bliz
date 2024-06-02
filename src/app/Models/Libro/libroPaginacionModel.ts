export interface LibroPagModel {
    count: number;
    next: string;
    previous: string;
    results: LibroPagModelResult[];
}

export interface LibroPagModelResult {
    id: string;
    titulo: string;
    genero: string;
    anio_publicacion: string;
    autor: string;
    editorial: string;
    cantidad: string;
    descripcion: string;
    prestados: number;
    devuelto: number; //Aea
}

export interface LibroModelFilter {
    search: string;
    page: number;
    page_size: number;
}