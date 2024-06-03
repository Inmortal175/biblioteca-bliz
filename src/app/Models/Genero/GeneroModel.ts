export interface GeneroModel {
    count: number;
    next: string;
    previous: string;
    results: GeneroModelResult[];
}

export interface GeneroModelResult {
    id_genero: number;
    nombre: string;
    descripcion: string;
}

export interface GeneroModel {
    id_genero: number;
    nombre: string;
    descripcion: string;
}
