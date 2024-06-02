export interface CreateLibroModel {
    id_libro?: number;
    titulo: string;
    anio_publicacion: number;
    cantidad: number;
    descripcion: string;
    id_autor: number;
    id_genero: number;
    id_proveedor: number;
    id_bibliotecario: number;
}
