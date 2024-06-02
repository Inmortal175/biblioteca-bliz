export interface AutorModel {
    id_autor: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacionalidad: string;
}

export interface AutorFilter {
    page_size?: number;
    page?: number;
}
