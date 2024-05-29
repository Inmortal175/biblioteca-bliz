export interface CreatePrestamoModel {
    id_prestamo?: number;
    fecha_prestamo: string;
    fecha_caducidad: string;
    id_usuario: number;
    id_bibliotecario: number;
    id_devolucion?: number;
}

export interface CreateDetallePrestamoModel {
    id_detalle_prestamo?: number;
    id_prestamo: number;
    id_libro: number;
}
