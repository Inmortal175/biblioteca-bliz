export interface ReporteUsuarioModel {
    count: number;
    next: string;
    previous: string;
    results: ReporteModelUsuarioResult[];
}

export interface ReporteModelUsuarioResult {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    es_activo: boolean;
    cant_prestamos: number;
    fecha_creacion: string;
    agregado_por: string;
}

export interface ReporteUsuarioParams {
    bibliotecario: string;
    fecha_inicio: string;
    fecha_limite: string;
    page: number;
    page_size: number;
}
