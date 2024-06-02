export interface EditorialModel {
    count: number;
    next: string;
    previous: string;
    results: EditorialResult;
}

export interface EditorialResult {
    id_editorial: number;
    nombre: string;
    direccion: string;
    email: string;
    telefono: string;
}
