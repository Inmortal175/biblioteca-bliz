import * as ts from 'typescript';

export interface PrestamosModel {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result {
    id_prestamo: number;
    fecha_prestamo: string;
    fecha_caducidad: string;
    usuario: string;
    bibliotecario: string;
    estado_devolucion: string;
    id_devolucion: number;
}
