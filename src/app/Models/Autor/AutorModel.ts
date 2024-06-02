export interface AutorModelList {
    count: number;
    next: string;
    previous: string;
    results: AutorModelListResult[];
}

export interface AutorModelListResult {
    id_autor: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacionalidad: string;
}

export interface AutorModel {
    id_autor: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacionalidad: string;
}
