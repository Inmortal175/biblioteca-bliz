export interface DetallePrestamoMoel {
    count: number;
    next: null | string;
    previous: null | string;
    results: Result[];
}

interface Result {
    titulo: string;
    autor: string;
    genero: string;
}
