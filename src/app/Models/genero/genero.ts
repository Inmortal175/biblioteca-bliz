export interface Genero {
    id_genero: number;
    nombre: string;
    descripcion: string;
}
export interface GeneroModel {
    count: number;
    next: string;
    previous: string;
    results: Genero[];
}
