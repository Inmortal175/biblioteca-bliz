export interface EditorialModel {
    count: number;
    next: string;
    previous: string;
    results: EditorialModelResult[];
}

export interface EditorialModelResult {
    id_editorial: number;
    nombre: string;
    direccion: string;
    email: string;
    telefono: string;
}
