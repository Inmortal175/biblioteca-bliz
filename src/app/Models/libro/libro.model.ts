export interface LibroModel {
    count: number;
    next: string;
    previous: string;
    results: LibroResult;
}

export interface LibroResult {
    id: string;
    titulo: string;
    genero: string;
    anio_publicacion: string;
    autor: string;
    editorial: string;
    cantidad: string;
    descripcion: string;
    prestados: number;
    devuelto: number;
}
