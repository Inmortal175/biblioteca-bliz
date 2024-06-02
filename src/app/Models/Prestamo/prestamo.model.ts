export interface PrestamoModel {
    count: number;
    next: string;
    previous: string;
    results: PrestamoResult[];
}

export interface PrestamoResult {
    id_prestamo: number;
    fecha_prestamo: string;
    fecha_caducidad: string;
    usuario: string;
    bibliotecario: string;
    estado_devolucion: string;
    id_devolucion: number;
}
