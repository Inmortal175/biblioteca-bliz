export interface ReporteDevolucionModel {
    count: number;
    next: string;
    previous: string;
    results: ReporteDevolucionModelResult[];
}

export interface ReporteDevolucionModelResult {
    libro: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    bibliotecario: string;
    fecha_devolucion: string;
}

export interface ReporteDevolucionParams {
    usuario: string;
    bibliotecario: string;
    fecha_inicio: string;
    fecha_limite: string;
    page_size?: number;
    page?: number;
}
