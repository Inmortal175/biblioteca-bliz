export interface ReportePrestamoModel {
    bibliotecario: string;
    estado_devolucion: string;
    fecha_caducidad: string;
    fecha_prestamo: string;
    genero_libro: string;
    libro: string;
    retraso: string;
    usuario: string;
}

export interface PrestamosFilter {
    usuario: string;
    titulo: string;
    bibliotecario: string;
    fecha_inicio: string;
    fecha_limite: string;
    page_size?: number;
    page?: number;
}

export interface ReportePrestamosModel {
    count: number;
    next: string;
    previous: null;
    results: ReportePrestamoModel[];
}
