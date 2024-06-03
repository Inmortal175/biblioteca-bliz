export interface Autor {
    id_autor?: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacionalidad: string;
}

export interface CreateAutor {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_nacionalidad: number;
}

export interface AutorParams {
    search: string;
    page: number;
    page_size: number;
}
