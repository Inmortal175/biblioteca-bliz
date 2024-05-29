export interface Libros {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

interface Result {
    id: string;
    titulo: string;
    genero: string;
    anio_publicacion: string;
    autor: string;
    editorial: string;
    cantidad: number;
    descripcion: string;
    prestados: number;
    devuelto: number;
}
