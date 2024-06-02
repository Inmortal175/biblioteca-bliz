export interface Autor {
    id_autor: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacionalidad: string;
}

export interface AutorModel {
    count: number;
    next: string;
    previous: string;
    results: Autor[];
}
