/* La declaración `interfaz de exportación PrestamoModel {` en TypeScript define una interfaz llamada
`PrestamoModel` que describe la estructura de un objeto de préstamo. Esta interfaz especifica las
propiedades que debe tener un objeto `PrestamoModel`, como `id_prestamo`, `fecha_prestamo`,
`fecha_caducidad`, `usuario`, `bibliotecario`, `estado_devolucion` y `id_devolucion`. */
export interface PrestamoModel {
    id_prestamo: number;
    fecha_prestamo: string;
    fecha_caducidad: string;
    usuario: string;
    bibliotecario: string;
    estado_devolucion: boolean;
    id_devolucion?: null;
}
